/* P02 ABOUT —— 2026-11 重构
   目标：15 秒内被理解。人物抠图占一侧，另一侧大留白 + 简短定位 +
   4 项能力以出版物索引（非卡片）排布。文案来自《搭配文案.pdf》。 */
import { fig } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'about',
  title: 'About',

  render() {
    return `
    <div class="page page-about layout-about section-scroll">
      <div class="about-compose">
        ${fig(A['about'].hero)}
        <div class="about-text">
          <p class="page-kicker anim-in"><span class="kicker-zh">吴熙晔</span> <span class="kicker-en">PORTFOLIO 2026</span></p>
          <h2 class="about-title anim-in">About Me</h2>
          <p class="about-lede anim-in">内容策划 · 社交媒体 · 项目传播</p>
          <div class="about-body anim-in">
            <p>我的实践主要集中在内容、社交媒体和项目传播领域。</p>
            <p>做过视频播客、小红书与公众号内容，也参与过品牌 Campaign、大型线下活动和前期研究。因为具备设计与剪辑能力，不少想法可以直接推进到成品。</p>
          </div>
          <div class="about-questions anim-in">
            <p>在工作时，我通常会先想几个问题：</p>
            <p class="aq-list">这件事为什么值得被看到？<br>用户会从哪里进入？<br>不同平台应该怎么说？<br>最后怎样真正落地？</p>
          </div>
          <div class="caps-index anim-in">
            <p class="caps-head">CAPABILITIES</p>
            <div class="caps-row">
              <p class="caps-term">Content Planning</p>
              <p class="caps-desc">选题策划 / 内容包装 / 长短内容转化</p>
            </div>
            <div class="caps-row">
              <p class="caps-term">Social Media</p>
              <p class="caps-desc">小红书 / 微信视频号 / 公众号 / 内容复盘</p>
            </div>
            <div class="caps-row">
              <p class="caps-term">Campaign &amp; Project</p>
              <p class="caps-desc">活动策划 / 多方协同 / 现场执行</p>
            </div>
            <div class="caps-row">
              <p class="caps-term">Visual Communication</p>
              <p class="caps-desc">视觉设计 / 插画 / 视频剪辑 / IP</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },
};
