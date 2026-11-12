/* P19 Personal Practice —— 文档第 19 页（末页）
   物理手账 Personal Archive（全部 14 张，Desk Spread）+ 数字账号（标准手机框）。
   PART 17：所有手账保留、方向正常、整体缩小、1 略大 + 其余小、轻微错位。 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'personal-practice',
  title: 'Personal Practice',

  render() {
    const p = A['personal-practice'];
    return `
    <div class="page page-project layout-personal-gallery section-scroll">
      ${folio('19', 'PERSONAL WORKS')}
      ${projectHead(
        '个人练习',
        '持续记录日常中的观察、情绪与灵感。',
        '',
        'Personal Practice',
      )}
      <div class="blocks">
        ${block('ABOUT', `<p>平时持续进行漫画、插画、动画和手账创作，题材来自旅行、电影、校园生活以及一些细小的日常观察。</p><p>相比完成特定项目，这些作品更自由，也逐渐形成了我自己的色彩、构图和表达习惯。</p>`, 'e-w-wide')}
      </div>
      <div class="journal-spread anim-in">
        ${figs(p.journals)}
      </div>
      <div class="blocks">
        ${block('内容分享', `<p>部分作品也会发布在个人小红书，与更多人分享。</p><p>日常漫画通常获得约 <span class="num">100–300</span> 赞，部分生活与文化观察类内容获得过更高互动。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
      ${figs(p.phones)}
    </div>`;
  },
};
