/* P12 CAMPAIGN & VISUAL —— 文档第 12 页（构图基本成立：收尺寸、松距离） */
import { folio, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'cafe-campaign',
  title: 'Campaign & Visual',

  render() {
    const p = A['cafe-campaign'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${folio('12', 'BRAND & EXPERIENCE')}
      ${projectHead(
        '活动传播与视觉设计',
        '将运营节点转化为具体的宣传内容与视觉物料。',
        '',
        'Campaign & Visual',
      )}
      <p class="project-intro anim-in">围绕校园咖啡吧的日常运营、节日活动与产品上新，独立完成宣传海报、公众号视觉、活动物料等内容设计，并根据不同传播场景调整信息与呈现方式，使线上宣传与线下活动保持一致。</p>
      ${fig(p.hero)}${figs(p.supporting)}
    </div>`;
  },
};
