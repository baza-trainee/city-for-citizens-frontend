import React from 'react';
import { BASE_URL } from '@/helpers/constants';
import PartnersSwiper from './partners-swiper';

async function getPartners() {
  const res = await fetch(`${BASE_URL}/partners`, {
    next: { revalidate: 10 },
  });
  try {
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function PartnersTape() {
  const partners = await getPartners();
  const newPartners = [...partners, ...partners, ...partners, ...partners];

  return <>{partners && <PartnersSwiper partners={newPartners} />}</>;
}
