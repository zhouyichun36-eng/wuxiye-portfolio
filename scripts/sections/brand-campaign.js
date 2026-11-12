/* P07 BRAND CAMPAIGN —— Campus Café（2026-11 重构，旧 P11+P12 合并）
   一页回答：一年里，品牌什么时候应该出现？
   文字极少：三个节点各一句，其余交给真实物料与门店纪实。 */
import { fig, block, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'brand-campaign',
  title: 'Brand Campaign',

  render() {
    const p = A['brand-campaign'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${projectHead(
        '品牌 Campaign',
        '一年里，品牌什么时候应该出现？',
        '大三期间，与另外三位同学共同运营上外松江校区图文中心咖啡吧。ROLE｜宣传店长——品牌内容 / 公众号 / 节点 Campaign / 视觉设计 / 线下物料。因为是全年运营，传播不是集中做几次活动，而是跟着校园生活节奏持续发生。',
        'CAMPUS CAFÉ · 1 YEAR',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('开学季', `<p>设计中间镂空的透明拍照卡，让用户可以直接与校园环境互动、拍照。</p>`, 'e-w-mid')}
        ${block('毕业季', `<p>设计购买咖啡即可获得的毕业卡片，让活动物料也成为可以带走的校园纪念。</p>`, 'e-w-mid e-x-right')}
      </div>
      ${fig(p.stand)}
      <div class="blocks">
        ${block('上新 / 招新', `<p>围绕新品和店员招募持续完成公众号内容、插画与视觉物料。</p>`, 'e-w-mid')}
      </div>
      ${fig(p.posterWinter)}
      ${fig(p.posterAutumn)}
      <p class="case-result anim-in">这一年，更像是在不断回答同一个问题：这个时间点，学生为什么需要注意到我们？</p>
    </div>`;
  },
};
