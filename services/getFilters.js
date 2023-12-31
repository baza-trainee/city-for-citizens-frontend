import { BASE_URL } from '@/helpers/constants';

export const getFilters = async ({ locale } = {}) => {
  let params = '';

  if (locale) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('locale', locale);
    params = '?' + urlSearchParams;
  }

  try {
    const response = await fetch(`${BASE_URL}/filters${params}`);
    if (!response.ok) throw new Error('Server Error');
    return response.json();
  } catch (error) {
    console.log('error:', error);
  }
};
