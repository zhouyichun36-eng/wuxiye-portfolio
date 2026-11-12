/* P09 VISUAL COMMUNICATION —— 2026-11 重构（旧 P15+P16 合并）
   核心逻辑：Visual as a Working Skill——让内容直接做到成品的工作能力。
   图片约 70–80%：西索鹅 + 校园建筑 specimen 陈列（archive spread 保留）。 */
import { fig, figs, block, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'visual-communication',
  title: 'Visual Communication',

  render() {
    const p = A['visual-communication'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${projectHead(
        '视觉表达',
        'Visual as a Working Skill',
        '视觉不是独立于内容之外的一条线。在不少项目中，它更像是一项可以让内容直接落地的工作能力。',
        'VISUAL COMMUNICATION',
      )}
      <div class="blocks">
        ${block('西索鹅｜Campus IP', `<p>以上外松江校区湖中的小天鹅为原型，独立完成角色设计与首套 <span class="num">24</span> 张微信表情；上线后获得学校官方公众号发布，并继续受邀完成后续新年、毕业季等系列。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.stickers)}
      ${fig(p.official)}
      ${fig(p.swan)}
      <div class="blocks">
        ${block('Campus Illustration', `<p>围绕校园代表性建筑进行系列插画创作；部分作品后续应用于 <span class="num">2025</span> 年历与学校官方传播。</p>`, 'e-w-mid e-x-right')}
      </div>
      <div class="specimen-collection anim-in">
        ${figs(p.buildings)}
      </div>
      <p class="anno anim-in vc-apps">OTHER APPLICATIONS——公众号视觉 / Campaign 物料 / 视频剪辑 / 活动视觉 / 内容封面。</p>
    </div>`;
  },
};
