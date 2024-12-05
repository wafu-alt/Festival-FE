import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr', // 가져올 이미지 도메인 추가
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tong.visitkorea.or.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
