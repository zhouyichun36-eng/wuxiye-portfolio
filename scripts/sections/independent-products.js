/* P18 Independent Products —— 文档第 18 页
   第一张手机壳摆拍已缩小（part 16）；图文咬合：日历 → “追感” → 帆布包 → 宣发手机截图 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'independent-products',
  title: 'Independent Products',

  render() {
    const p = A['independent-products'];
    return `
    <div class="page page-project layout-personal-gallery section-scroll">
      ${folio('18', 'PERSONAL WORKS')}
      ${projectHead(
        '从插画到产品',
        '把个人创意做成可以使用、购买和带走的东西。',
        '',
        'Independent Products',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('2024 原创日历', `<p>独立完成概念、插画、贴纸与成品设计。</p><p>将月份插画与互动贴纸结合：用户既可用贴纸记录大事件，也能让贴纸与背景画面发生视觉互动。</p><p>两篇小红书宣发获 <span class="num">100+</span> 赞，短期售出 <span class="num">30+</span> 份，并取得作品版权证书。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.calendarPost)}
      <div class="blocks">
        ${block('“追感”系列', `<p>围绕原创插画开发手机壳、帆布包、滴胶贴纸与便签等产品。</p><p>手机壳累计售出 <span class="num">50+</span> 件；校园市集期间，系列剩余现货全部售罄。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
      ${figs(p.supporting)}
    </div>`;
  },
};
