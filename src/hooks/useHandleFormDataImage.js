'use client';
import { useState } from 'react';

export function useHandleFormDataImage() {
  const [formDataImage, setFormDataImage] = useState('');

  const handleChangeFormDataImage = e => {
    let bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);

    setFormDataImage(bodyFormData);
  };

  return [formDataImage, handleChangeFormDataImage];
}
