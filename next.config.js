module.exports = {

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['via.placeholder.com'], // 가져올 이미지 도메인 (via.placeholder.com) 추가
  },
};
