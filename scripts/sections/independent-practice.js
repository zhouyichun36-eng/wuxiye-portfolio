/* P10 INDEPENDENT PRACTICE —— 2026-11 重构（旧 P17+P18+P19 合并）
   核心：自己发起一个东西，并直接面对用户反馈。
   数据为视觉锚点（以《搭配文案.pdf》最新数据为准）；
   产品本身做大，白底摆放，无卡片无阴影。 */
import { fig, block, projectHead, dataRow } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'independent-practice',
  title: 'Independent Practice',

  render() {
    const p = A['independent-practice'];
    return `
    <div class="page page-project layout-personal-gallery section-scroll">
      ${projectHead(
        '独立实践',
        '自己做一些东西，也直接看用户反馈',
        '',
        'INDEPENDENT PRACTICE',
      )}
      <div class="blocks">
        ${block('2024 ORIGINAL CALENDAR', `<p>从概念、插画到互动贴纸和成品设计均独立完成，并取得作品版权证书。</p>`, 'e-w-mid')}
      </div>
      ${dataRow([
        ['100+', '小红书宣发点赞'],
        ['100+', '短期售出（份）'],
      ])}
      ${fig(p.calendarPost)}
      <div class="blocks">
        ${block('“追感”系列', `<p>围绕原创插画开发手机壳 / 帆布包 / 滴胶贴纸 / 便签；校园市集期间剩余现货售罄。</p>`, 'e-w-mid e-x-right')}
      </div>
      ${dataRow([['50+', '手机壳累计售出（件）']])}
      ${fig(p.flatlay)}
      ${fig(p.totebag)}
      ${fig(p.zhuigan)}
      <div class="blocks">
        ${block('PERSONAL CONTENT', `<p>持续在个人小红书发布漫画、插画、旅行和生活观察。</p>`, 'e-w-mid')}
      </div>
      ${dataRow([['100–300', '日常漫画通常获赞']])}
      ${fig(p.viralPost)}
      <p class="case-result anim-in">个人项目规模不大，但所有环节都离用户反馈很近：什么有人愿意点开，什么有人愿意分享，什么最后真的有人愿意买。</p>
    </div>`;
  },
};
