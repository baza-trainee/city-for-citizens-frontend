const LOCALE = {
  en: { forRequest: 'en_US', forIntl: 'en' },
  uk: { forRequest: 'uk_UA', forIntl: 'uk' },
};

const NAVIGATION = {
  home: '/',
  admin: '/admin',
  login: '/login',
  register: '/register',
  requestPasswordReset: '/password-reset/request',
};

const FORM_STYLES = {
  formContainer:
    'mx-auto flex max-w-[394px] flex-col items-center gap-[30px] py-4',
  formBtn:
    'mx-auto my-0 block w-full rounded-lg p-2.5px-[40px] py-[10px] text-gray/0 dark:border-gray/5 dark:text-gray/100  dark:hover:bg-gray/10',
};

// const BASE_URL = 'http://45.94.157.117:53431/api';
// const IMAGE_BASE_URL = 'http://45.94.157.117:53431/images/events/';
const BASE_URL = 'https://city-backend-45go.onrender.com/api';
const IMAGE_BASE_URL = 'https://city-backend-45go.onrender.com/images/events/';

export { LOCALE, BASE_URL, IMAGE_BASE_URL, NAVIGATION, FORM_STYLES };