import { BASE_URL } from '@/helpers/constants';

const fetchData = async ({
  url,
  method,
  params = null,
  eventData = null,
  imageFormData = null,
  imageString = null,
  eventId = null,
}) => {
  const token = localStorage.getItem('accessToken');

  const options = {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  let searchParams = '';

  if (eventId) {
    searchParams = '/' + eventId;
  }

  if (params) {
    searchParams = '?' + params;
  }

  if (imageFormData) {
    options.body = imageFormData;
  }

  if (imageString) {
    options.body = JSON.stringify(imageString);
    options.headers['Content-Type'] = 'application/json;charset=utf-8';
  }

  if (eventData) {
    options.body = JSON.stringify(eventData);
    options.headers['Content-Type'] = 'application/json;charset=utf-8';
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

const getAllEvents = async params => {
  return fetchData({ url: '/events', method: 'GET', params });
};

const createEvent = async formData => {
  return fetchData({ url: '/events', method: 'POST', eventData: formData });
};

const updateEvent = (formData, eventId) => {
  return fetchData({
    url: '/events',
    method: 'PATCH',
    eventId,
    eventData: formData,
  });
};

const deleteEvent = async eventId => {
  return fetchData({ url: '/events', method: 'DELETE', eventId });
};

const createEventImage = async imageFormData => {
  return fetchData({ url: '/image', method: 'POST', imageFormData });
};

const deleteEventImage = imageString => {
  return fetchData({ url: '/image', method: 'DELETE', imageString });
};

export {
  getEventsBySearchParams,
  getAllEvents,
  createEvent,
  createEventImage,
  deleteEvent,
  deleteEventImage,
  updateEvent,
};
