'use client';
const { useState } = require('react');
import Image from 'next/image';
import { IMAGE_BASE_URL } from '@/helpers/constants';

export function SlideImage({ event }) {
  const [isImageError, setIsImageError] = useState(false);
  function handleImageError() {
    setIsImageError(true);
  }
  return (
    <Image
      onError={handleImageError}
      src={
        isImageError ? '/mock-img.webp' : `${IMAGE_BASE_URL}${event.eventImage}`
      }
      alt={event.eventTitle}
      width={400}
      height={300}
      className="h-full w-full object-cover"
    ></Image>
  );
}
