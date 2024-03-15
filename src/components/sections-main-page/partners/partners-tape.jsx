import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from '@/helpers/constants';

async function getPartners() {
  const res = await fetch(`${BASE_URL}/partners`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

const MemoizedPartner = React.memo(function MemoizedPartner({ partner }) {
  return (
    <Link
      key={partner.id}
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative mr-[120px] flex h-[100px] w-[160px] items-center justify-center overflow-hidden"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_PARTNERS_IMAGE_BASE_URL}/${partner.image}`}
        alt={partner.name}
        fill
        objectFit="cover"
      />
    </Link>
  );
});

export default async function PartnersTape() {
  const partners = await getPartners();

  if (!partners) {
    return null;
  }

  const memoizedPartners =
    partners?.map(partner => (
      <MemoizedPartner key={partner.id} partner={partner} />
    )) || [];

  const repeatedPartners = [...memoizedPartners, ...memoizedPartners];

  return (
    <div className="flex overflow-hidden">
      <div className="animate-scroll-left flex whitespace-nowrap">
        {repeatedPartners}
      </div>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        .animate-scroll-left {
          animation: scroll-left 100s linear infinite;
        }
      `}</style>
    </div>
  );
}
