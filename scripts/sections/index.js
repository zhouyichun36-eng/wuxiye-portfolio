/* ==========================================================================
   sections/index.js — 页面注册表
   2026-11 重构：20 页 → 11 页（能力优先结构，P01 封面完全不动）。
   数组顺序 = 浏览顺序。旧 20 页模块文件保留在目录中但不再注册。
   ========================================================================== */
import cover from './cover.js';                        // P01（已完成，勿动）
import about from './about.js';                        // P02
import selectedWork from './selected-work.js';         // P03
import contentSocial from './content-social.js';       // P04
import socialMedia from './social-media.js';           // P05
import festival from './festival.js';                  // P06
import brandCampaign from './brand-campaign.js';       // P07
import researchInsight from './research-insight.js';   // P08
import visualCommunication from './visual-communication.js'; // P09
import independentPractice from './independent-practice.js'; // P10
import contact from './contact.js';                    // P11

export const sections = [
  cover,
  about,
  selectedWork,
  contentSocial,
  socialMedia,
  festival,
  brandCampaign,
  researchInsight,
  visualCommunication,
  independentPractice,
  contact,
];
