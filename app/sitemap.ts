import { type MetadataRoute } from 'next';
import { locales } from '@/i18n';

import { BASE_URL } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  // 上一周的日期，用于标记最近更新的内容
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  // 每月的日期，用于标记不经常更新的内容
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // 首页
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'explore', // 探索页面
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'submit', // 提交页面
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'startup', // 游戏公司页面
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 添加更多静态页面
    {
      url: 'privacy-policy', // 隐私政策
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'terms', // 服务条款
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'contact', // 联系我们
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 动态添加分类页面
  // 注意：实际应用中，您可能需要从数据库获取这些类别
  const categories = ['action', 'adventure', 'rpg', 'strategy', 'simulation', 'sports'];

  categories.forEach((category) => {
    sitemapRoutes.push({
      url: `category/${category}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // 为每个本地化版本创建URL
  const sitemapData = sitemapRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  return sitemapData;
}
