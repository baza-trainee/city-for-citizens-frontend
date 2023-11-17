import { BASE_URL } from '@/helpers/constants';

export const getEvents = async ({ searchParams, locale }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/events?locale=${locale}&${searchParams}`
    );
    if (!response.ok) throw new Error('Server Error');

    return response.json();
  } catch (error) {
    console.log("error:", error)
  
  }
};
