import React from 'react';
import { BASE_URL } from '@/helpers/constants';
import PartnersSwiper from './partners-swiper';

async function getPartners() {
  const res = await fetch(`${BASE_URL}/partners`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function PartnersTape() {
  const partners = await getPartners();
  const newPartners = [...partners, ...partners, ...partners, ...partners];

  return <PartnersSwiper partners={newPartners} />;
}
