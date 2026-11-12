/* P14 Desk Research —— 文档第 14 页
   资料大图是页面视觉主体：标题 → 背景说明 → 全幅资料 → 其余文字
   容器加 .research-detail，archive-spread.js 会在首次进入 viewport 时把资料图
   轻微展开到最终位置；Phase 13 起统一使用 media-hover（删除此前的 Detail Zoom）。 */
import { folio, block, fig, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'desk-research',
  title: 'Desk Research',

  render() {
    return `
    <div class="page page-project layout-research-archive section-scroll">
      ${folio('14', 'RESEARCH & INSIGHT')}
      ${projectHead(
        '小红书公益薯 × BottleDream',
        '把分散的社会创新案例整理成可供策划判断的资料基础。',
        '',
        'Desk Research',
      )}
      <div class="blocks">
        ${block('BACKGROUND', `<p>小红书公益薯计划联合 BottleDream 筹备乡村社会创新主题项目，需要快速建立前期案例与议题资料基础。</p>`)}
      </div>
      <div class="research-detail">
        ${fig(A['desk-research'].hero)}
      </div>
      <div class="blocks">
        ${block('TASK', `<p>参与案头研究、案例检索与重点案例细化，为后续项目策划和合作沟通提供研究支持。</p>`, 'block--indent')}
        ${block('ACTION', `<p>围绕乡村社会创新、社会企业、公益组织、文化空间、社区伙伴及可持续项目等方向搜集资料，并统一结构整理机构、项目、议题与参考信息；进一步深挖重点案例。</p>`)}
        ${block('RESULT', `<p>累计整理约 <span class="num">80</span> 个社会创新案例，形成可供团队策划与讨论使用的案例资料库。</p>`, 'block--indent')}
      </div>
    </div>`;
  },
};
