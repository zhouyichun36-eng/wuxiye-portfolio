/**
 * Section: P1 封面
 * ------------------------------------------------------------------
 * 独立出版物封面，不是网站 Hero。
 * 最终层级：1. 中央手写「作品集」（真实手写素材，主视觉）
 *          2. 左上角 PORTFOLIO（杂志刊名式英文标识）
 *          3. 底图（承担氛围与颜色）
 * 交互：仅入场 reveal + 手写标题弹跳（interactions/title-bounce.js）。
 * 文案来源：《吴熙晔_作品集逐页文案.docx》P1。
 */
import { mount as mountTitleInteraction } from '../interactions/title-interaction.js';

export default {
  id: 'cover',
  title: '封面',

  render() {
    return `
    <section class="page page-cover" aria-label="封面">
      <img class="cover-bg anim-in" src="./assets/img/cover-bg.jpg" alt=""
           fetchpriority="high" decoding="async" />
      <div class="cover-stage">
        <p class="cover-brand anim-in">PORTFOLIO</p>
        <p class="cover-name anim-in">吴熙晔</p>
        <img class="cover-title anim-in" src="./assets/img/cover-title.png?v=3"
             alt="作品集" data-bounce-title fetchpriority="high" decoding="async" />
        <p class="cover-scroll-hint anim-in" aria-hidden="true"><span class="csh-arrow">↓</span><span class="csh-text">向下滑动</span></p>
      </div>
    </section>`;
  },

  mount(root) {
    return mountTitleInteraction(root);
  },
};
