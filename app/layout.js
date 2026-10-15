import './globals.css';

const title = 'Төгөл Апартмент — Арвайхээр';

export const metadata = {
  metadataBase: new URL('https://tugulappartment.netlify.app'),
  title,
  description:
    'Төгөл апартмент — Арвайхээр хотын А бүсэд. Тун удахгүй ашиглалтад орох 50 айлын шинэ орон сууц. Урьдчилгаа 30%, бартер боломжтой.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    siteName: 'Төгөл Апартмент',
    title,
    description:
      'Арвайхээр хотын А бүсэд 50 айлын шинэ орон сууц. Урьдчилгаа 30%, бартер боломжтой. Утас: 99928898, 95897513',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f7f3ea',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <head>
        <link rel="preload" as="image" href="/img/hero.jpg" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/URWGeometric-Regular.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/URWGeometric-ExtraBold.woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
