import { useState } from 'react';

export function useHandleFormData(locale) {
  const [formData, setFormData] = useState({
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
    eventUrl: '',
    coordinates: '',
  });

  const handleChangeFormData = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return [formData, handleChangeFormData];
}
