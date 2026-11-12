/**
 * Interaction: media-hover（Phase 13 — 统一全站图片 / 手机框 Hover）
 * ------------------------------------------------------------------
 * 所有嵌入网站的图片（含手机截图、抠图、透明 PNG）共用一套轻微物理反馈。
 * 不再有「部分图片有 hover、部分静止」的状态。
 *
 * 适用范围（统一一套）：
 *   - figure.img-slot（普通照片、海报、插画、手账、建筑、Campaign 等）
 *   - .phone-device（整个手机对象，包括手机框 PNG + 内部截图作为一个整体）
 *
 * Hover 动效（Desktop）：
 *   - 默认：translateY(-3px) scale(1.015)，320ms ease-out
 *   - 抠图素材（cutout modifier）：translateY(-2px) scale(1.013)
 *     —— 透明素材无矩形边界、效果尤轻（像真实小物件被轻轻碰了一下）
 *   - 不加阴影 / 发光 / 边框 / blur / overlay / 3D Tilt / 大幅 rotate
 *   - 不改变 width / height / margin（零 layout shift）
 *
 * Mobile Tap（无 hover 的触屏）：
 *   - 一次轻 scale 1 → 1.015 → 1 + translateY 0 → -2px → 0
 *   - 240–280ms，结束后自动归位
 *   - 不调用 preventDefault()，不阻碍 swipe / vertical scroll
 *
 * Phone 设备特殊：
 *   - 整个 .phone-device 作为单一容器一起 hover
 *   - 内部 .phone-screen img **不单独**应用 transform（保持相对手机框静止）
 *   - 删除之前所有：fit-long 内部慢滚动 / LONG Screenshot Auto Scroll /
 *                   Drag screenshot / Phone Internal Scroll Animation
 *
 * P16 / P19 Spread 优先级：
 *   - 入场 spread 未完成时（容器无 .is-spread-done）不启用 hover
 *   - spread 完成后才允许 hover，避免 transform 冲突
 *
 * P01 封面手写「作品集」：
 *   - 走自己的 title-interaction.js（Hover + Click Bounce）
 *   - 本模块在 .cover-stage 内不添加 .media-hover
 *
 * Reduced Motion：
 *   - 完全不绑定（保持静态）
 *
 * 用法：在 main.js 启动时调用一次 enableMediaHover()，无需清理（全局）。
 */

const SELECTOR = 'figure.img-slot, .phone-device';

let installed = false;

export function enableMediaHover() {
  if (installed) return;
  installed = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const isTouch = window.matchMedia('(hover: none)').matches;

  requestAnimationFrame(() => {
    annotate();
    if (isTouch) bindTouch();
    else bindMouse();
    watchSpread();
  });
}

/* ===================== 标注 .media-hover 类别 ===================== */

function annotate() {
  document.querySelectorAll(SELECTOR).forEach((el) => {
    if (isExcluded(el)) return;
    el.classList.add('media-hover');
    if (isCutout(el)) el.classList.add('media-hover--cutout');
    if (el.classList.contains('phone-device')) el.classList.add('media-hover--phone');
  });
}

/* 监听 spread 容器，is-spread-done 后给仍未标注的子项补上 .media-hover */
function watchSpread() {
  const targets = document.querySelectorAll('.specimen-collection, .journal-spread');
  if (!targets.length) return;
  const mo = new MutationObserver((muts) => {
    muts.forEach((m) => {
      if (!m.target.classList.contains('is-spread-done')) return;
      m.target.querySelectorAll(SELECTOR).forEach((el) => {
        if (isExcluded(el)) return;
        if (!el.classList.contains('media-hover')) el.classList.add('media-hover');
        if (isCutout(el) && !el.classList.contains('media-hover--cutout')) {
          el.classList.add('media-hover--cutout');
        }
      });
    });
  });
  targets.forEach((t) => mo.observe(t, { attributes: true, attributeFilter: ['class'] }));
}

/* ===================== 判定 ===================== */

function isExcluded(el) {
  // P01 封面手写「作品集」由 title-interaction.js 独立接管
  if (el.classList?.contains('cover-title')) return true;
  if (el.closest?.('.cover-stage')) return true;
  return false;
}

function isCutout(el) {
  // manifest role === 'CUTOUT'
  if (el.dataset?.role === 'CUTOUT') return true;
  // 父容器为抠图陈列（specimen-collection / journal-spread / about-compose / specimen / archive）
  let p = el.parentElement;
  while (p) {
    if (
      p.classList.contains('specimen-collection') ||
      p.classList.contains('journal-spread') ||
      p.classList.contains('about-compose') ||
      p.classList.contains('specimen') ||
      p.classList.contains('archive')
    ) return true;
    p = p.parentElement;
  }
  return false;
}

function isIncompleteSpread(el) {
  const parent = el.parentElement;
  if (!parent) return false;
  const inSpread =
    parent.classList.contains('specimen-collection') ||
    parent.classList.contains('journal-spread');
  return inSpread && !parent.classList.contains('is-spread-done');
}

/* ===================== Desktop hover ===================== */

function bindMouse() {
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(SELECTOR);
    if (!el) return;
    if (isExcluded(el)) return;
    if (!el.classList.contains('media-hover')) return;
    if (isIncompleteSpread(el)) return;
    el.classList.add('is-hover');
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest(SELECTOR);
    if (!el) return;
    if (isExcluded(el)) return;
    // relatedTarget 仍在本元素内部（如 phone 内子元素互移）→ 不取消
    const next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(SELECTOR);
    if (next === el) return;
    el.classList.remove('is-hover');
  }, { passive: true });
}

/* ===================== Mobile tap ===================== */

function bindTouch() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest(SELECTOR);
    if (!el) return;
    if (isExcluded(el)) return;
    if (!el.classList.contains('media-hover')) return;
    if (isIncompleteSpread(el)) return;
    if (el.classList.contains('is-tap')) return;
    el.classList.add('is-tap');
    setTimeout(() => el.classList.remove('is-tap'), 280);
  }, { passive: true });
}