const withNextIntl = require('next-intl/plugin')();

const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'city-backend-45go.onrender.com',
      },
    ],
  },
};

module.exports = withNextIntl(config);
