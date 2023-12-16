const withNextIntl = require('next-intl/plugin')();

const config = {
  images: {
    domains: ['city-backend-45go.onrender.com'],
  },
};

module.exports = withNextIntl(config);
