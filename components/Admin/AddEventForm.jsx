'use client';

import { NAVIGATION } from '@/helpers/constants';
import { useRouter } from '@/navigation';
import { logout } from '@/services/authAPI';

import { privateRoute } from '../privateRoute';
import { useState } from 'react';
import { useCurrentLocale } from '@/hooks';
import { createEvent, createEventImage } from '@/services/eventAPI';

const AddEventForm = () => {
  const router = useRouter();
  const { localeForRequest } = useCurrentLocale();

  const [formData, setFormData] = useState({
    eventTitle: '',
    date: '',
    time: '',
    description: '',
    eventUrl: '',
    city: '',
    street: '',
    notes: '',
    coordinates: '',
    eventType: '',
  });

  const options = {
    locale: localeForRequest,
    idIdentifier: '',
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = e => {};

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    router.push(NAVIGATION.login);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await createEvent({ ...options, ...formData });
  };

  return (
    <div className="container">
      <form className="mb-[30px] flex flex-col items-center  gap-[15px]">
        <label>
          <span>Event Name</span>
          <input
            name="eventTitle"
            value={formData.eventTitle}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>eventUrl</span>
          <input
            name="eventUrl"
            value={formData.eventUrl}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>city</span>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>street</span>
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>notes</span>
          <input
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            type="text"
          />
        </label>

        <label>
          <span>eventType</span>
          <input
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>coordinates</span>
          <input
            name="coordinates"
            value={formData.coordinates}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          <span>eventImage</span>
          <input
            accept="image/*"
            name="eventImage"
            onChange={handleImageChange}
            type="file"
          />
        </label>

        <div className="flex gap-[15px]">
          <label>
            <span>Date</span>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
            />
          </label>
          <label>
            <span>Time</span>

            <input
              name="time"
              value={formData.time}
              onChange={handleChange}
              type="time"
            />
          </label>
        </div>
      </form>
      <button
        className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]"
        onClick={handleSubmit}
      >
        Add event
      </button>
      <button
        className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default privateRoute({
  component: AddEventForm,
  redirectTo: NAVIGATION.login,
});
