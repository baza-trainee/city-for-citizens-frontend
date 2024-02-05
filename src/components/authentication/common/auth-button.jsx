import { LoadingButton } from '@/components/common';

export default function AuthButton({ error, isFormValid, isLoading, btnName }) {
  return (
    <button
      disabled={!isFormValid || isLoading}
      className={`block rounded border p-2.5  py-[10px] text-xl font-bold 
     ${btnName === 'Увійти' ? 'mx-auto px-8' : 'w-[182px]'}
       ${
         !isFormValid || error
           ? 'cursor-not-allowed bg-auth-dark text-auth-light'
           : 'bg-auth-dark text-auth-light hover:opacity-90'
       }
    `}
    >
      {isLoading ? <LoadingButton /> : <>{btnName}</>}
    </button>
  );
}
