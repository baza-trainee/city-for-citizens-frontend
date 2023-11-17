const withNextIntl = require('next-intl/plugin')();

const config = {
  images: {
    domains: ['185-237-14-12.cloud-xip.com'],
  },
};

module.exports = withNextIntl(config);
