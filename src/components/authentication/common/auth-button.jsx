import { LoadingButton } from '@/components/common';

export default function AuthButton({ error, isFormValid, isLoading, btnName }) {
  return (
    <button
      disabled={!isFormValid || isLoading}
      className={`block rounded border py-2.5 text-xl font-bold text-auth-light 
     ${btnName === 'Увійти' ? 'mx-auto px-8' : 'w-[182px]'}
       ${
         !isFormValid || error
           ? 'cursor-not-allowed bg-auth-dark_10 '
           : 'bg-auth-dark hover:opacity-90'
       }
    `}
    >
      {isLoading ? <LoadingButton /> : <>{btnName}</>}
    </button>
  );
}
