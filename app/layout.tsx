import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout/Layout.component';
import Script from 'next/script';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="cmyk">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
      //  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
