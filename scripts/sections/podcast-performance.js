/* P06 PROJECT PERFORMANCE —— 文档第 06 页
   数据页：标题 → 导语(正文) → 后台证据 → 分发说明 → 第二证据 → 发布帖
   文字先于图片（PART 12），数据截图作证据、发布帖套标准手机框 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'podcast-performance',
  title: '项目成效',

  render() {
    const p = A['podcast-performance'];
    return `
    <div class="page page-project layout-performance section-scroll">
      ${folio('06', 'CONTENT & SOCIAL')}
      ${projectHead(
        '项目成效',
        '让一档深度内容，在不同平台获得持续传播。',
        '',
        'PROJECT PERFORMANCE',
      )}
      <p class="project-intro anim-in">视频播客上线后，通过小红书、视频号等平台进行分发，并继续拆分短切片，延长单期内容的传播周期。</p>
      ${fig(p.data[0])}
      <div class="blocks">
        ${block('多平台分发', `<p>完整视频承担深度内容表达，短切片则根据不同平台的观看习惯重新提炼开头、标题与信息重点，使一次内容生产能够继续转化为多种传播素材。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.data[1])}
      <div class="blocks">
        ${block('小红书后台数据', `<p>从前台互动到后台数据，进一步观察内容的曝光、观看与用户反馈。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
      ${fig(p.supporting[0])}
    </div>`;
  },
};
