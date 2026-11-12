/**
 * Interaction: page-transition（PART 03 + 04）
 * ------------------------------------------------------------------
 * 接管 deck onChange：
 *   - 离开的 section：opacity 1 → 0.92, scale 1 → 0.985（极轻纸张放下）
 *   - 进入的新 section：opacity 0 → 1, translateY 20px → 0（克制淡入）
 *   - 整体 380ms，纸张翻到下一页的"沉"感，不做 PowerPoint Transition
 *   - 重播新 section 内的 .anim-in stagger（确保每次进入都看见 reveal）
 *
 * 关键设计：
 *   - 仅做 opacity / translateY / scale 微调（不使用 rotate / blur / 3D）
 *   - 不抢 deck 自带的 translateY track 切换（两套 transform 层级独立）
 *   - reduced-motion：直接不加 transition class
 *   - 离开旧 section 后 cleanup（避免动画跑完后样式残留）
 *
 * 调用：在 main.js 中把 deck.onChange 套上 applyTransition(index, prev, sectionEls)。
 */

const EXIT_MS = 380;
const ENTER_MS = 420;

let cleanupTimer = null;

export function applyTransition(index, prevIndex, sectionEls) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sectionEls.forEach((el) => el.classList.remove('is-leaving', 'is-entering'));
    return;
  }

  // 1. 旧 section：exit 状态
  if (prevIndex !== undefined && prevIndex !== index) {
    const prev = sectionEls[prevIndex];
    if (prev) {
      prev.classList.remove('is-entering');
      prev.classList.add('is-leaving');
    }
  }

  // 2. 新 section：从 entering 初始态回到默认态（淡入）
  const next = sectionEls[index];
  if (next) {
    next.classList.remove('is-leaving');
    next.classList.add('is-entering');
    // 双 rAF：确保 is-entering 的初始态先被浏览器真正渲染（opacity:0 / translateY 22px），
    // 再移除，让 CSS transition 从初始态 → 默认态平滑推进，避免瞬间闪到 1。
    requestAnimationFrame(() => requestAnimationFrame(() => {
      next.classList.remove('is-entering');
    }));
  }

  // 3. cleanup 旧 section 的 leaving class
  if (cleanupTimer) clearTimeout(cleanupTimer);
  cleanupTimer = setTimeout(() => {
    sectionEls.forEach((el) => el.classList.remove('is-leaving'));
  }, EXIT_MS + 80);

  // 4. 重播 .anim-in reveal stagger（让每次进入都看见）
  if (next) {
    next.querySelectorAll('.anim-in').forEach((el) => {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    });
  }
}