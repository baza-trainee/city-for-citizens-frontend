const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'city-backend-45go.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'kyivcity.gov.ua',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
