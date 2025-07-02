/**
 * SEO配置文件
 * 包含网站SEO相关的常量和配置
 */

// 网站域名
export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://xxgames.com';

// 默认元数据
export const DEFAULT_METADATA = {
  title: 'XXgames - 探索最佳游戏 2024',
  description: '在XXgames游戏导航目录中获取您喜欢的游戏。游戏列表每天更新。现在免费提交以增强您的游戏曝光度。',
  keywords: ['游戏', '游戏导航', '游戏目录', 'XXgames', '免费游戏', '游戏列表', '2024游戏'],
};

// 社交媒体配置
export const SOCIAL_MEDIA = {
  twitter: '@XXgames',
  facebook: 'XXgames',
  instagram: 'XXgames',
};

// 公司/组织信息
export const ORGANIZATION_INFO = {
  name: 'XXgames',
  logo: `${SITE_DOMAIN}/images/og-image.jpg`,
  contactPhone: '+1-234-567-8900',
  contactEmail: 'contact@xxgames.com',
  foundingDate: '2023-01-01',
};

// 主要颜色
export const BRAND_COLORS = {
  primary: '#4169E1',
  background: '#222129',
  text: '#FFFFFF',
};

// 主要页面路径
export const MAIN_PAGES = {
  home: '/',
  explore: '/explore',
  submit: '/submit',
  startup: '/startup',
  privacy: '/privacy-policy',
  terms: '/terms',
  contact: '/contact',
};

// 分类列表
export const GAME_CATEGORIES = ['action', 'adventure', 'rpg', 'strategy', 'simulation', 'sports', 'racing', 'puzzle'];

// 语言版本
export const LANGUAGES = {
  en: '英语',
  cn: '简体中文',
  tw: '繁体中文',
};

// 格式化网站URL（确保以https://开头，结尾不带斜杠）
export function formatSiteUrl(path: string = ''): string {
  const base = SITE_DOMAIN.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  return cleanPath ? `${base}/${cleanPath}` : base;
}

// 创建Open Graph图片URL
export function getOgImageUrl(customPath?: string): string {
  return customPath ? formatSiteUrl(`images/${customPath}`) : formatSiteUrl('images/og-image.jpg');
}

// 获取标准化的规范链接URL
export function getCanonicalUrl(path: string = '', locale: string = 'cn'): string {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  return formatSiteUrl(`${localePath}${path}`);
}
