/* P11 Campus Café —— 文档第 11 页
   结构：实景图 + 三条完整推文作品组（works-row）+ 文案
   PART 14：删除「招新推文赞 / 招新推文转发 / 宣传店长只需一名」三个 KPI 数据，
   不保留空位、不替代、不留空组件；删除后以编辑式文本构图重新调整留白与横向位置。 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'campus-cafe',
  title: 'Campus Café',

  render() {
    const p = A['campus-cafe'];
    return `
    <div class="page page-project layout-project-intro section-scroll">
      ${folio('11', 'BRAND & EXPERIENCE')}
      ${projectHead(
        '校园咖啡吧品牌传播',
        '围绕校园生活节点，持续经营一个面向学生的线下品牌。',
        '',
        'Campus Café',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('BACKGROUND', `<p>图文咖吧是上外松江校区内长期运营的校园咖啡吧，主要面向在校学生。</p><p>相比单次活动，更需要通过持续的内容更新、节点策划与线下物料，让品牌保持活跃并不断创造新的到店理由。</p>`, 'e-w-wide')}
        ${block('ROLE', `<p>大三全年担任宣传店长，负责品牌传播与视觉内容，包括年度传播节奏、节点 Campaign、公众号内容及线下物料，并与实际运营、财务等岗位协作推进落地。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
      <div class="works-row anim-in">
        ${figs(p.articles)}
      </div>
      <div class="blocks">
        ${block('如何运营', `<p>以校园生活节奏作为传播节点，围绕 毕业季 / 开学季 / 秋季上新 / 店员招新 等场景持续策划内容与活动；线上通过公众号完成内容发布与视觉呈现，线下则结合卡片、拍照物料等设计，将传播进一步带入真实消费场景。</p>`, 'e-w-wide')}
        ${block('项目成效', `<p>全年持续完成多个节点 Campaign 与日常品牌内容；毕业季、开学季等线下物料实际投入门店使用并产生用户参与。</p><p>围绕毕业季、开学季、秋季上新、店员招新等节点完成线上线下传播；公众号中的插画、视觉与页面设计均由我独立完成。</p>`, 'e-w-wide e-x-in1')}
      </div>
      ${figs(p.supporting)}
    </div>`;
  },
};
