/**
 * Interaction: title-interaction (P1 封面手写「作品集」)
 * ------------------------------------------------------------------
 * 鼠标 / 手指靠近这张手写纸片时产生一点物理反馈：
 *   Hover (Desktop only)：
 *     - 整张被轻轻「拿起」一点：translateY(-3px) scale(1.015) rotate(-0.3deg)
 *     - 持续 hover ~200ms 后做一次非常轻的 sway：rotate(-0.3 → 0.25 → 0deg)
 *     - mouseleave 自然回到原位（由 CSS transition 接管）
 *
 *   Click / Tap：
 *     - 复用 tactile bounce 逻辑：scaleY 0.94 / scaleX 1.03 / translateY 6px → 轻 overshoot
 *     - 用 WAAPI 临时覆盖 transform，结束后自动回到 hover / 默认状态
 *     - 优先级高于 hover，动画完成后如果鼠标仍在标题上，回到 hover
 *
 * 关键设计：
 *   - Hover 与 Click 走两套独立 transform 通道：Hover 通过 CSS 变量、Click 用 WAAPI
 *   - WAAPI 完成后自动取消，无需手动 reset；可与 CSS hover transition 并存
 *   - reduced-motion：直接不绑定任何事件
 *   - 不阻止 swipe / wheel，不绑定 preventDefault
 *
 * 用法：cover.js 在 mount() 中调用 mount(root)，返回 cleanup。
 *      元素约定：<img class="cover-title" data-bounce-title>
 */

const HOVER_LIFT_MS = 320;
const HOVER_SWAY_DELAY = 220;
const HOVER_SWAY_MS = 460;
const CLICK_BOUNCE_MS = 420;

const CLICK_KEYFRAMES = [
  { transform: 'translateY(0px) scale(1, 1)',                          offset: 0    },
  { transform: 'translateY(6px) scale(1.03, 0.94)',                    offset: 0.32 },
  { transform: 'translateY(-2px) scale(0.995, 1.02)',                 offset: 0.62 },
  { transform: 'translateY(0px) scale(1, 1)',                          offset: 1    },
];
const CLICK_TIMING = {
  duration: CLICK_BOUNCE_MS,
  easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
};

const SWAY_KEYFRAMES = [
  { transform: 'translateY(-3px) scale(1.015, 1) rotate(-0.3deg)',  offset: 0    },
  { transform: 'translateY(-3px) scale(1.015, 1) rotate(0.25deg)',  offset: 0.5  },
  { transform: 'translateY(-3px) scale(1.015, 1) rotate(0deg)',     offset: 1    },
];
const SWAY_TIMING = {
  duration: HOVER_SWAY_MS,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  fill: 'none',  // 结束后让 CSS hover 接回 -0.3deg
};

export function mount(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const title = root.querySelector('[data-bounce-title]');
  if (!title) return () => {};

  const isTouch = window.matchMedia('(hover: none)').matches;
  let hoverSwayTimer = null;
  let clickAnim = null;

  /* ——— Hover (Desktop only) —— */
  const onEnter = () => {
    title.classList.add('is-hover');
    if (hoverSwayTimer) clearTimeout(hoverSwayTimer);
    hoverSwayTimer = setTimeout(() => {
      // 如果当前在做 click bounce，不要启动 sway
      if (clickAnim && clickAnim.playState === 'running') return;
      title.animate(SWAY_KEYFRAMES, SWAY_TIMING);
    }, HOVER_SWAY_DELAY);
  };
  const onLeave = () => {
    title.classList.remove('is-hover');
    if (hoverSwayTimer) {
      clearTimeout(hoverSwayTimer);
      hoverSwayTimer = null;
    }
  };

  /* ——— Click / Tap —— */
  const onTrigger = () => {
    if (clickAnim) clickAnim.cancel();
    clickAnim = title.animate(CLICK_KEYFRAMES, CLICK_TIMING);
    clickAnim.finished.catch(() => {}).then(() => {
      // 完成后如果还在 hover 区域，让 is-hover class 自然接管
      if (clickAnim && clickAnim.playState === 'finished') clickAnim = null;
    });
  };

  if (!isTouch) {
    title.addEventListener('mouseenter', onEnter);
    title.addEventListener('mouseleave', onLeave);
  }
  // Touch + Desktop 都支持 click/tap
  title.addEventListener('click', onTrigger);

  return () => {
    if (!isTouch) {
      title.removeEventListener('mouseenter', onEnter);
      title.removeEventListener('mouseleave', onLeave);
    }
    title.removeEventListener('click', onTrigger);
    if (hoverSwayTimer) clearTimeout(hoverSwayTimer);
    if (clickAnim) clickAnim.cancel();
    title.classList.remove('is-hover');
  };
}