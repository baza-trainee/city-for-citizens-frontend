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

const FORM_STYLES = {
  formBtn: `mx-auto block text-xl rounded p-2.5 px-8 py-[10px] text-auth-light font-bold `,
};

// const BASE_URL = 'http://45.94.157.117:53431/api';
// const IMAGE_BASE_URL = 'http://45.94.157.117:53431/images/events/';
const BASE_URL = 'https://city-backend-45go.onrender.com/api';
const IMAGE_BASE_URL = 'https://city-backend-45go.onrender.com/images/events/';

export {
  LOCALE,
  BASE_URL,
  IMAGE_BASE_URL,
  NAVIGATION,
  FORM_STYLES,
  ADMIN_NAVIGATION,
  AUTH_NAVIGATION,
};
