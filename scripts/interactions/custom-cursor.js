/**
 * Interaction: custom-cursor（PART 03 — 自定义光标 + Mobile touch indicator）
 * ------------------------------------------------------------------
 * Desktop（hover: hover）：
 *   - 用用户手绘光标图案替换系统指针外观（一个轻量 .site-cursor 图层）
 *   - 默认状态：跟随鼠标，轻微 opacity；尖端大致对准鼠标
 *   - Hover 到可交互元素 / 作品图 / 可点元素：非常轻的 scale 1.14
 *   - 不做：发光 / 粒子拖尾 / 强烈磁吸 / 长尾巴 / 高频抖动
 *
 * Mobile（hover: none）：
 *   - 不做常驻跟随手指的 cursor
 *   - 手指触碰屏幕时，在触点短暂出现这枚光标，轻 scale + fade 后消失（touch indicator）
 *   - 停留约 260ms，不追踪手指
 *
 * 与首屏滑动引导共用这枚图案（见 scroll-hint.js 的同款 cursor 元素）。
 * 全程不 preventDefault；不阻塞滑动 / 翻页 / 触摸。
 */
const CURSOR = '#site-cursor';
const INTERACTIVE =
  'a, button, [role="button"], .contents-item, .deck-dots button, .media-hover, figure.img-slot, .phone-device';

let cursorEl = null;

export function enableCustomCursor() {
  cursorEl = document.querySelector(CURSOR);
  if (!cursorEl) return;

  const isTouch = window.matchMedia('(hover: none)').matches;

  /* 最终交付要求：Mobile / Touch Device 彻底关闭自定义光标，
     不做 touch indicator、不模拟鼠标跟随。图层默认 opacity:0，保持隐藏。 */
  if (isTouch) return;

  bindDesktopCursor();
}

/* ===================== Desktop 光标本体 ===================== */

function bindDesktopCursor() {
  let x = -100, y = -100;
  let shown = false;
  let raf = null;

  const follow = () => {
    raf = null;
    cursorEl.style.left = `${x}px`;
    cursorEl.style.top = `${y}px`;
  };
  const schedule = () => {
    if (raf === null) raf = requestAnimationFrame(follow);
  };

  window.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!shown) {
      shown = true;
      cursorEl.classList.add('is-on');
    }
    schedule();
  }, { passive: true });

  const setHover = (v) => cursorEl.classList.toggle('is-hover', v);
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(INTERACTIVE)) setHover(true);
  }, { passive: true });
  document.addEventListener('mouseout', (e) => {
    const next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(INTERACTIVE);
    if (!next) setHover(false);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    shown = false;
    cursorEl.classList.remove('is-on', 'is-hover');
  }, { passive: true });
}

/* ===================== Mobile touch indicator（已停用） =====================
   最终交付要求：手机端彻底关闭自定义光标，不再保留 touch indicator。
   保留空实现以兼容潜在引用；元素保持 opacity:0 隐藏。 */
function bindTouchIndicator() {}