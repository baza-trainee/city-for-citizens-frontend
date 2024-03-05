'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BASE_URL } from '@/helpers/constants';
import ButtonMainPage from './button-main-page';

async function getPolicyDocument() {
  const res = await fetch(`${BASE_URL}/documents`);

  if (!res.ok) {
    throw new Error('Failed to fetch policy document');
  }
  const documents = await res.json();
  const policyDocument = documents.find(document =>
    document.name.includes('Політика конфіденційності')
  );
  if (!policyDocument) {
    throw new Error('Policy document not found');
  }
  return policyDocument;
}

export default function ModalCookies() {
  const [isVisible, setIsVisible] = useState(false);
  const [policyDocument, setPolicyDocument] = useState(null);
  const t = useTranslations('ModalCookies');

  const isWordCookie = text => {
    const regex = /\bcookie(s)?\b/gi;
    return regex.test(text);
  };

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (!acceptedCookies) {
      setIsVisible(true);
    }

    const fetchPolicyDocument = async () => {
      try {
        const document = await getPolicyDocument();
        setPolicyDocument(document);
      } catch (error) {
        console.error('Failed to fetch policy document:', error);
      }
    };

    fetchPolicyDocument();
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('acceptedCookies', true);
    setIsVisible(false);
  };

  return (
    <div
      className={`modal-mobile fixed bottom-4 left-[50%] z-[1001] flex -translate-x-1/2 items-center justify-between gap-4 rounded-lg bg-light-secondary p-4 font-roboto text-sm leading-[1.4] dark:bg-dark-secondary  max-tablet:flex-wrap desktop:w-full desktop:max-w-[1200px] ${isVisible ? '' : 'hidden'}`}
    >
      <p>
        {t('title')
          .split(' ')
          .map((word, index) => {
            return (
              <span
                key={index}
                className={` ${isWordCookie(word) ? 'text-black dark:text-white' : 'dark:text:dark-main text-light-main'}`}
              >
                {word} {index !== 0 && ' '}
              </span>
            );
          })}
        <a
          className="cursor-pointer text-light-head hover:text-dark-button-pressed hover:transition-all dark:text-dark-accent dark:hover:text-dark-button-hover"
          id={policyDocument?.id}
          href={policyDocument?.file}
        >
          {t('learnMore')}
        </a>
      </p>
      <ButtonMainPage
        variant="main"
        className="w-full tablet:w-[240px]"
        onClick={handleAcceptCookies}
      >
        {t('accept')}
      </ButtonMainPage>
    </div>
  );
}
