/* P09 Selected Social Content —— 文档第 09 页
   digital（手机截图）× physical（手账抠图）两种媒介交替出现，形成咬合 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'social-content',
  title: 'Selected Social Content',

  render() {
    const p = A['social-content'];
    return `
    <div class="page page-project layout-performance section-scroll">
      ${folio('09', 'CONTENT & SOCIAL')}
      ${projectHead(
        '社交媒体内容运营',
        '用日常内容与具体项目，补充持续运营和转化能力。',
        '',
        'Selected Social Content',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('行动手帐传播', `<p>负责《Do Something》行动手账的小红书宣发，单篇获得 <span class="num">46</span> 赞、<span class="num">18</span> 收藏、<span class="num">2</span> 评论；配合公众号等渠道传播，刊物累计售出 <span class="num">233</span> 本。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.data[0])}
      ${fig(p.supporting[0])}
      <div class="blocks">
        ${block('日常社媒运营', `<p>同时参与 BottleDream 日常社交媒体内容，包括活动招募、议题传播及项目相关内容，根据不同传播目标调整内容形式与表达方式。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
    </div>`;
  },
};
