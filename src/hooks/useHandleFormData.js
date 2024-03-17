'use client';
import { formatDateSeparatorDash, formatDateToTime } from '@/helpers';
import { useEffect, useState } from 'react';

export function useHandleFormData(locale, eventData) {
  const initialFormData = {
    locale,
    eventTitle: '',
    description: '',
    eventUrl: '',
    city: '',
    street: '',
    notes: '',
    eventType: '',
    eventImage: '',
    date: '',
    time: '',
    coordinates: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (eventData) {
      const {
        eventTitle,
        description,
        eventUrl,
        eventAddress,
        eventTypes,
        eventImage,
        dateTime,
      } = eventData;

      setFormData(prev => ({
        ...prev,
        eventTitle,
        description,
        eventUrl,
        city: eventAddress.city,
        street: eventAddress.street,
        notes: eventAddress.notes,
        eventType: eventTypes.map(({ eventType }) => eventType).join(', '),
        eventImage,
        date: formatDateSeparatorDash(dateTime),
        time: formatDateToTime(dateTime),
        coordinates: eventAddress.coordinates,
      }));
    }
  }, [eventData]);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChangeFormData = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return [formData, handleChangeFormData, resetForm];
}
