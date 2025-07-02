import Script from 'next/script';

import { GOOGLE_TRACKING_ID } from '@/lib/env';

export default function SeoScript() {
  return (
    <>
      {/* Google Analytics */}
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TRACKING_ID}`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TRACKING_ID}', {
            page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* 结构化数据 - 组织信息 */}
      <Script
        id='schema-org-organization'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "XXgames",
              "url": "https://xxgames.com",
              "logo": "https://xxgames.com/images/og-image.jpg",
              "sameAs": [
                "https://twitter.com/xxgames",
                "https://facebook.com/xxgames",
                "https://instagram.com/xxgames"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-234-567-8900",
                "contactType": "customer service",
                "availableLanguage": ["English", "Chinese"]
              },
              "description": "XXgames提供最佳游戏导航服务，帮助玩家发现2024年最优质的游戏"
            }
          `,
        }}
      />

      {/* 结构化数据 - 网站信息 */}
      <Script
        id='schema-org-website'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://xxgames.com",
              "name": "XXgames",
              "description": "探索最佳游戏 2024",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://xxgames.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `,
        }}
      />

      {/* 结构化数据 - 面包屑导航 */}
      <Script
        id='schema-org-breadcrumb'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "首页",
                  "item": "https://xxgames.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "探索",
                  "item": "https://xxgames.com/explore"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "提交",
                  "item": "https://xxgames.com/submit"
                }
              ]
            }
          `,
        }}
      />
    </>
  );
}
