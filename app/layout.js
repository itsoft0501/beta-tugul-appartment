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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
