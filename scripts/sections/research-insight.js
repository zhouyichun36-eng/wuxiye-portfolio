/* P08 RESEARCH & INSIGHT —— 2026-11 重构（旧 P13+P14 合并）
   视觉中心 = 真实资料库截图（页面最大元素）。
   保留诚实声明：项目未继续推进，只展示前期研究产出。
   不强调 BottleDream 品牌，强调 Research 能力与 80 cases。 */
import { fig, projectHead, dataRow } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'research-insight',
  title: 'Research & Insight',

  render() {
    const p = A['research-insight'];
    return `
    <div class="page page-project layout-research-archive section-scroll">
      ${projectHead(
        '研究与洞察',
        '从陌生领域，到可用于策划的资料库',
        '小红书公益薯 × BottleDream——项目早期计划围绕乡村社会创新展开合作。进入具体策划之前，需要先快速了解：有哪些行动者？大家分别在解决什么问题？哪些案例值得继续跟进？',
        'RESEARCH & INSIGHT',
      )}
      ${dataRow([['80', '社会创新案例']])}
      <div class="research-detail">
        ${fig(p.hero)}
      </div>
      <p class="anno anim-in ri-scope">参与 Desk Research，围绕乡村社会创新 / 社会企业 / 公益组织 / 文化空间 / 社区项目 / 可持续实践进行案例搜集和整理，并统一整理机构、项目、议题与参考信息，供团队后续策划和合作讨论使用。</p>
      <p class="case-result anim-in">项目后来因合作方调整没有继续推进，因此这里只展示前期研究产出，不将其包装成完整项目成果。</p>
    </div>`;
  },
};
