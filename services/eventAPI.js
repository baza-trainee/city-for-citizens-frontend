import { BASE_URL } from '@/helpers/constants';

const fetchData = async ({
  url,
  method,
  params = null,
  eventData = null,
  image = null,
}) => {
  const token = localStorage.getItem('accessToken');

  const options = {
    method,
  };

  let searchParams = '';

  if (params) {
    searchParams = '?' + new URLSearchParams(params);
  }

  if (image) {
    options.headers = {
      Authorization: 'Bearer ' + token,
    };
  }

  if (eventData) {
    options.body = JSON.stringify(eventData);
    options.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token,
    };
  }

  try {
    const response = await fetch(`${BASE_URL}${url}${searchParams}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || errorData || 'Network response was not ok.'
      );
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

const getEventsBySearchParams = async params => {
  return fetchData({ url: '/events', method: 'GET', params });
};

const getAllEvents = async () => {
  return fetchData({ url: '/events', method: 'GET' });
};

const createEvent = async eventData => {
  return fetchData({ url: '/events', method: 'POST', eventData });
};

const updateEvent = () => {};

const createEventImage = image => {
  console.log('image:', image);
  return fetchData({ url: '/image', method: 'POST', image });
};

const deleteEventImage = () => {};

export { getEventsBySearchParams, getAllEvents, createEvent, createEventImage };
