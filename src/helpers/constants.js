const LOCALE = {
  en: { forRequest: 'en_US', forIntl: 'en' },
  uk: { forRequest: 'uk_UA', forIntl: 'uk' },
};

const ADMIN_NAVIGATION = {
  event_list: '/admin',
  event_types: '/admin/event-types',
  documents: '/admin/documents',
  partners: '/admin/partners',
  contacts: '/admin/contacts',
  password_change: '/admin/password-change',
};

const AUTH_NAVIGATION = {
  login: '/login',
  request_password_reset: '/password-reset/request',
  password_reset: '/password-reset/reset',
};

const NAVIGATION = {
  home: '/',
  admin: '/admin',
  login: '/login',
  register: '/register',
  requestPasswordReset: '/password-reset/request',
  passwordReset: '/password-reset/reset',
};

// const BASE_URL = 'http://45.94.157.117:53431/api';
// const IMAGE_BASE_URL = 'http://45.94.157.117:53431/images/events/';
// const BASE_URL = 'https://city-backend-45go.onrender.com/api';
// const IMAGE_BASE_URL = 'https://city-backend-45go.onrender.com/images/events/';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const IMAGE_PARTNERS_URL = process.env.NEXT_PUBLIC_PARTNERS_IMAGE_BASE_URL;

export {
  LOCALE,
  BASE_URL,
  IMAGE_BASE_URL,
  NAVIGATION,
  ADMIN_NAVIGATION,
  AUTH_NAVIGATION,
  IMAGE_PARTNERS_URL,
};
