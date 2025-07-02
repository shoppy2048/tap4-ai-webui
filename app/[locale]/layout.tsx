import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';

import GoogleAdScript from '@/components/ad/GoogleAdScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

// 配置网站元数据
export const metadata: Metadata = {
  title: {
    default: 'XXgames - 探索最佳游戏 2024',
    template: '%s | XXgames'
  },
  description: '在XXgames游戏导航目录中获取您喜欢的游戏。游戏列表每天更新。现在免费提交以增强您的游戏曝光度。',
  keywords: ['游戏', '游戏导航', '游戏目录', 'XXgames', '免费游戏', '游戏列表', '2024游戏'],
  authors: [{ name: 'XXgames Team' }],
  creator: 'XXgames',
  publisher: 'XXgames',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://xxgames.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'zh-CN': '/cn',
      'zh-TW': '/tw',
    },
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'XXgames',
    title: 'XXgames - 探索最佳游戏 2024',
    description: '在XXgames游戏导航目录中获取您喜欢的游戏。游戏列表每天更新。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'XXgames游戏导航',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XXgames - 探索最佳游戏 2024',
    description: '在XXgames游戏导航目录中获取您喜欢的游戏。游戏列表每天更新。',
    images: ['/images/og-image.jpg'],
    creator: '@XXgames',
    site: '@XXgames',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  themeColor: '#4169E1'
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <body className='relative mx-auto flex min-h-screen flex-col bg-tap4-black text-white'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
        <SeoScript />
        <GoogleAdScript />
      </body>
    </html>
  );
}
