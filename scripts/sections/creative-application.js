/* P16 CREATIVE APPLICATION —— 文档第 16 页
   PART 15：西索鹅组 → 公众号 Phone Screenshot → 建筑作品组；
   删除重复建筑；建筑以 SPECIMEN COLLECTION（不同尺寸+错位）陈列。 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'creative-application',
  title: 'Creative Application',

  render() {
    const p = A['creative-application'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${folio('16', 'VISUAL STORYTELLING')}
      ${projectHead(
        '创意表达与应用',
        '把日常观察转化为具有个人风格、并能进入真实场景的创意表达。',
        '',
        'Creative Application',
      )}
      ${fig(p.stickers[0])}
      <div class="blocks">
        ${block('西索鹅 原创角色创作', `<p>以上外松江校区湖中的小天鹅为灵感，提炼其外形特征与校园记忆，独立完成角色设定及首套 <span class="num">24</span> 张微信表情，并持续延展新年、毕业季等系列内容。</p><p>作品上线微信后获得学校官方发布，并继续受邀完成后续系列。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.stickers[1])}${fig(p.stickers[2])}
      <div class="blocks">
        ${block('校园建筑插画', `<p>围绕校园代表性建筑进行系列创作，从轮廓、结构与空间特征中提取视觉元素，以统一的个人风格重新呈现熟悉的校园景观。</p>`, 'e-w-mid e-x-right')}
      </div>
      ${fig(p.article)}
      <div class="blocks">
        ${block('应用与传播', `<p>系列作品后续应用于 <span class="num">2025</span> 年历及学校官方传播。</p>`, 'e-w-narrow e-x-in1 e-statement')}
      </div>
      <div class="specimen-collection anim-in">
        ${figs(p.buildings)}
      </div>
    </div>`;
  },
};
