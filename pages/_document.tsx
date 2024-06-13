import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko" data-theme="cmyk">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
