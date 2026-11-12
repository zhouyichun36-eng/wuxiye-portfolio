/**
 * Interaction: title-bounce（P1 手写标题弹跳）
 * ------------------------------------------------------------------
 * 点击 / tap 手写「作品集」时产生一次轻微的弹性按压反馈：
 *   下压（scaleY ~0.94, scaleX ~1.03, translateY +6px）
 *   → 极轻 overshoot → 回到初始状态，总时长 ~420ms。
 * 气质：像按了一下纸面上的手写贴纸，不是按钮动画。
 *
 * 约定：
 * - mount(root) 在页面激活时调用，返回 cleanup（离开页面自动卸载）
 * - click 事件同时覆盖鼠标点击与移动端 tap，不劫持 swipe / 滚轮翻页
 * - 连续快速点击：取消上一次动画重播，不会状态错乱
 * - 尊重 prefers-reduced-motion：直接不绑定
 */

const KEYFRAMES = [
  { transform: 'translateY(0) scale(1, 1)', offset: 0 },
  { transform: 'translateY(6px) scale(1.03, 0.94)', offset: 0.32 },
  { transform: 'translateY(-2px) scale(0.995, 1.02)', offset: 0.62 },
  { transform: 'translateY(0) scale(1, 1)', offset: 1 },
];

const TIMING = {
  duration: 420,
  easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', // 轻快弹性，带极小 overshoot
};

export function mount(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const title = root.querySelector('[data-bounce-title]');
  if (!title) return () => {};

  let current = null;

  const onTrigger = () => {
    if (current) current.cancel(); // 快速连击：打断重播，永远回到初始帧
    current = title.animate(KEYFRAMES, TIMING);
    current.finished.catch(() => {}).then(() => {
      if (current && current.playState === 'finished') current = null;
    });
  };

  title.addEventListener('click', onTrigger);

  return () => {
    title.removeEventListener('click', onTrigger);
    if (current) current.cancel();
  };
}
