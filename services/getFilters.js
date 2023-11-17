import { BASE_URL } from '@/helpers/constants';

export const getFilters = async ({ locale }) => {
  try {
    const response = await fetch(`${BASE_URL}/filters?locale=${locale}`);
    if (!response.ok) throw new Error('Server Error');
    return response.json();
  } catch (error) {
    console.log('error:', error);
  }
};
