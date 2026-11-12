/**
 * Interaction: scroll-hint（PART 02 — 首次访问的「向下滑动」引导）
 * ------------------------------------------------------------------
 * 目的：让第一次进入的用户自然意识到「这个作品集要继续向下滑动」。
 * 出现时机：首次访问（localStorage 记录），P1 封面加载后约 0.9s。
 * 视觉：极轻 —— 自定义光标图案出现在页面下方偏中，纵向下移一段，
 *       配一句极小黑字「向下滑动」，然后整体淡出。
 * 消失：用户第一次真正滑动 / 触摸 / 翻页后，立即淡出并记录，不再出现。
 * 协调：目录打开时此引导立即取消（不长期占据 Header 附近区域）。
 *
 * 原则：
 *   - 不做大箭头 / bouncing mouse / 模板式 Scroll Down / 夸张动画
 *   - 只出现一次；用 session/local 状态避免反复打扰
 *   - 不 preventDefault；不阻塞滑动 / 翻页
 */
const STORAGE_KEY = 'portfolio-scroll-hint-shown';
const CURSOR_SRC = './assets/img/cursor.png';

let hintEl = null;
let shown = false;
let cancelled = false;

export function enableScrollHint() {
  // 首次访问才出现
  if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const timer = setTimeout(show, 900);

  // 页面对当前还在封面 / 目录未打开时才出现
  return () => {
    clearTimeout(timer);
    cancel();
  };
}

/* 目录打开 / 离开封面时由 main.js 调用，立即取消 */
export function cancelScrollHint() {
  cancel();
}

function show() {
  if (cancelled || document.querySelector('.scroll-hint')) return;
  const host = document.getElementById('deck') || document.body;
  hintEl = document.createElement('div');
  hintEl.className = 'scroll-hint';
  hintEl.id = 'scroll-hint';
  hintEl.setAttribute('aria-hidden', 'true');
  hintEl.innerHTML = `
    <img class="scroll-hint-cursor" src="${CURSOR_SRC}" alt="" aria-hidden="true" />
    <span class="scroll-hint-text">向下滑动</span>`;
  host.appendChild(hintEl);
  shown = true;

  // 下一帧加 .is-on，让整体淡入，再触发内部 cursor 下移动画
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (hintEl) hintEl.classList.add('is-on');
  }));

  // 一次性监听，任一真实输入即淡出并记录
  const dismiss = () => dismissHint();
  const inputEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  inputEvents.forEach((ev) => window.addEventListener(ev, dismiss, { passive: true, once: true }));
}

function dismissHint() {
  if (!shown) return;
  try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* ignore */ }
  if (hintEl) hintEl.classList.add('is-gone');
  setTimeout(() => { if (hintEl) hintEl.remove(); hintEl = null; shown = false; }, 520);
}

function cancel() {
  cancelled = true;
  if (hintEl) {
    hintEl.classList.add('is-gone');
    setTimeout(() => { if (hintEl) hintEl.remove(); hintEl = null; }, 520);
  }
  shown = false;
}