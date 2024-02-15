'use client';

import React, { useState, useId } from 'react';
import IconEyeOpen from '@/assets/icons/eyes-password/password-visible.svg';
import IconEyeClose from '@/assets/icons/eyes-password/password-protected.svg';

export default function Input({
  label,
  name,
  register,
  errors,
  type = 'text',
  width = 'w-[351px]',
  ...props
}) {
  const inputId = useId();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev);
  };

  return (
    <label htmlFor={inputId} className={`${width}  text-start`}>
      {label && (
        <span
          className={`mb-1 inline-block text-lg leading-none  ${errors[name] ? 'text-state-error_main' : 'text-admin-dark'}`}
        >
          {label}
        </span>
      )}
      <div className="relative">
        <input
          {...register(`${name}`)}
          id={inputId}
          aria-invalid={errors[name] ? 'true' : 'false'}
          className={` w-full text-ellipsis rounded border
        bg-admin-light_3 py-3 pl-2 pr-12 leading-[1.35] placeholder-auth-dark_10 focus:outline-none 
        ${errors[name] ? 'border-state-error_main' : 'border-auth-dark_10'}
     `}
          type={isShowPassword ? 'text' : type}
          {...props}
        />
        {type === 'password' && (
          <span
            role="switch"
            aria-checked={isShowPassword}
            onClick={togglePasswordVisibility}
            className={`bg-gray/5 absolute right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer
          items-center justify-center`}
          >
            {isShowPassword ? <IconEyeOpen /> : <IconEyeClose />}
          </span>
        )}
      </div>
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
}
