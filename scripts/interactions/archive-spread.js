/**
 * Interaction: archive-spread（PART 08 + 09 + 07 收口）
 * ------------------------------------------------------------------
 * P14 Research、P16 建筑、P19 手账：进入 viewport 第一次时执行「展开」动画，
 * 让一组素材从略微靠近中心的位置轻轻摊开到最终 layout。
 *
 * 触发：每个容器初次进入「可见区」时执行一次。
 *   由于目标位于 .section-scroll 页内滚动容器中，仅靠 IntersectionObserver 的
 *   viewport root 不可靠（P16 建筑需滚动才可见、不触发）。
 *   方案：同时监听 ——
 *     1) IntersectionObserver（viewport root，供非滚动页 / 首屏可见目标）
 *     2) 各 target 最近滚动容器的 scroll 事件（供需要滚动才可见的目标）
 *   任一先触发即执行并取消另一个，保证只跑一次。
 *
 * 完成态：容器加 .is-spread-done，纸面 hover/tap 才允许（PART 12 优先级）。
 * reduced-motion：完全跳过（直接 .is-spread-done）。
 */

const SPREAD_MS = 720;
const SPREAD_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

let installed = false;

export function enableArchiveSpread() {
  if (installed) return;
  installed = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.querySelectorAll('.research-detail, .specimen-collection, .journal-spread')
      .forEach((c) => c.classList.add('is-spread-done'));
    return;
  }

  const targets = document.querySelectorAll(
    '.research-detail, .specimen-collection, .journal-spread',
  );
  if (!targets.length) return;

  targets.forEach((t) => armOne(t));
}

function armOne(target) {
  let ran = false;

  function fire() {
    if (ran) return;
    ran = true;
    if (io) io.disconnect();
    if (scroller) {
      scroller.removeEventListener('scroll', onScroll, { passive: true });
    }
    runSpread(target);
  }

  function visibleNow() {
    const r = target.getBoundingClientRect();
    const vh = window.innerHeight;
    // 目标或其一部分已进入视口（顶部在视口内或顶部略上但底部可见）
    return r.top < vh && r.bottom > 0;
  }

  function onScroll() {
    if (visibleNow()) fire();
  }

  // 1. viewport IO 兜底
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) fire();
    });
  }, { threshold: 0.1 });
  io.observe(target);

  // 2. 滚动容器监听
  const scroller = target.closest('.section-scroll');
  if (scroller) {
    scroller.addEventListener('scroll', onScroll, { passive: true });
    // 立即检查一次（首屏可能已在视口内但 IO 有节流）
    requestAnimationFrame(() => { if (visibleNow()) fire(); });
  }
}

function runSpread(container) {
  const isP19 = container.classList.contains('journal-spread');
  const items = Array.from(container.querySelectorAll(':scope > .img-slot'));
  if (!items.length) {
    container.classList.add('is-spread-done');
    return;
  }

  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const stagger = isP19 ? 90 : 70;

  items.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const ix = r.left + r.width / 2;
    const iy = r.top + r.height / 2;
    const dx = cx - ix;
    const dy = cy - iy;
    const len = Math.hypot(dx, dy) || 1;

    const max = isP19 ? 22 : 16;
    const k = max / 3.5;
    const offset = Math.min(max, len * 0.22) * k;

    const tx = (dx / len) * offset;
    const ty = (dy / len) * offset;
    const rot = ((dx / len) * 0.8) + (((i % 2) ? -1 : 1) * 0.4);

    el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
    el.style.transition = 'none';
    el.dataset.spreadInit = '1';
  });

  requestAnimationFrame(() => {
    items.forEach((el, i) => {
      el.style.transition = `transform ${SPREAD_MS}ms ${SPREAD_EASE} ${i * stagger}ms`;
      el.style.transform = '';
    });

    setTimeout(() => {
      items.forEach((el) => {
        el.style.transition = '';
        el.removeAttribute('data-spread-init');
      });
      container.classList.add('is-spread-done');
    }, SPREAD_MS + items.length * stagger + 80);
  });
}