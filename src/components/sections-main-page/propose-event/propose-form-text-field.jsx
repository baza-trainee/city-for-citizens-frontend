'use client';

import React, { useState } from 'react';
import { useId } from 'react';
import { useTranslations } from 'next-intl';

const CHARACTER_LIMIT = 300;

const TextField = ({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder = '',
}) => {
  const t = useTranslations('ProposeEvent');
  const inputId = useId();
  const [charCount, setCharCount] = useState(0);

  const handleChange = event => {
    const value = event.target.value;
    setCharCount(value.length);
  };

  return (
    <label htmlFor={inputId} className="w-full text-start">
      {label && (
        <span
          className={`mb-1  inline-block font-roboto text-sm font-normal leading-tight 
           dark:text-dark-main ${errors[name] ? 'text-light-main' : 'text-light-main'}`}
        >
          {label}
        </span>
      )}
      {type === 'textarea' ? (
        <>
          <textarea
            {...register(`${name}`)}
            placeholder={placeholder}
            type={type}
            name={name}
            id={inputId}
            aria-label={label}
            aria-invalid={errors[name] ? 'true' : 'false'}
            className="bg-zinc-100 inline-flex min-h-[152px] w-full resize-none items-center 
            justify-start gap-2 rounded-lg border-light-border bg-light-secondary px-4 py-3 font-roboto 
            text-base font-normal leading-snug text-black shadow-[0_5px_12px_rgba(115,115,115,0.1)] placeholder:text-light-head 
             placeholder:opacity-30 focus:outline-none dark:border dark:border-dark-border
             dark:bg-dark-secondary dark:text-dark-head dark:shadow-none dark:placeholder:text-dark-head"
            onChange={handleChange}
            onReset={() => setCharCount(0)}
            maxLength={CHARACTER_LIMIT}
          />
          <p className="text-sm text-light-main">
            {charCount}/{CHARACTER_LIMIT} {t('characters')}
          </p>
        </>
      ) : (
        <input
          {...register(`${name}`)}
          placeholder={placeholder}
          type={type}
          name={name}
          id={inputId}
          aria-label={label}
          aria-invalid={errors[name] ? 'true' : 'false'}
          className="bg-zinc-100 light:shadow light:shadow-eventCard inline-flex w-full items-center 
          justify-start gap-2 rounded-lg border-light-border bg-light-secondary px-4 
          py-3 font-roboto text-base font-normal leading-snug text-black shadow-[0_5px_12px_rgba(115,115,115,0.1)] 
          placeholder:text-light-head  placeholder:opacity-30
          focus:outline-none dark:border dark:border-dark-border dark:bg-dark-secondary
          dark:text-dark-head dark:shadow-none dark:placeholder:text-dark-head"
        />
      )}
      {errors[name] && (
        <p
          role="alert"
          className="absolute pt-[2px] text-sm text-state-error_main"
        >
          {errors[name]?.message}
        </p>
      )}
    </label>
  );
};

export default TextField;
