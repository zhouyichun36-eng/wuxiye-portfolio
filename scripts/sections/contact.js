/* P11 CONTACT / Closing —— 2026-11 重构（旧 P20）
   极简结尾：人物抠图 + 非常少文字 + 大留白。
   不做复杂 Footer / 社交 icon 墙 / 二维码堆叠。 */
import { fig } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'contact',
  title: "Let's Connect",

  render() {
    return `
    <div class="page page-contact section-scroll">
      <div class="contact-compose">
        <div class="contact-portrait">
          ${fig(A['contact'].portrait)}
        </div>
        <div class="contact-note">
          <p class="contact-kicker anim-in">CONTACT · 联系</p>
          <h2 class="contact-title anim-in">期待合作</h2>
          <p class="contact-en anim-in">LET'S CONNECT</p>
          <div class="contact-hope anim-in">
            <p>希望继续参与：</p>
            <p>内容策划 / 社交媒体运营 / 创意 Campaign / 品牌 · 市场传播 / 项目运营。</p>
            <p>也希望继续做需要在内容 × 用户 × 真实场景之间来回工作的事情。</p>
          </div>
          <div class="contact-lines anim-in">
            <div class="contact-line">
              <p class="contact-label">吴熙晔</p>
            </div>
            <div class="contact-line">
              <p class="contact-label">Email</p>
              <p class="contact-value"><a href="mailto:484132589@qq.com">484132589@qq.com</a></p>
            </div>
            <div class="contact-line">
              <p class="contact-label">Phone</p>
              <p class="contact-value"><a href="tel:17816632536">17816632536</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },
};
