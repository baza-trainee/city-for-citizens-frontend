import { LoadingButton } from '../UI/LoadingButton';

const AuthButton = ({ error, isFormValid, isLoading, btnName }) => {
  return (
    <button
      disabled={
        (!isFormValid && btnName !== 'Повернутися') ||
        (isLoading && btnName !== 'Повернутися')
      }
      className={`flex justify-center rounded border py-[10px] text-xl font-bold 
      ${btnName === 'Увійти' ? 'mx-auto  px-8' : 'w-[182px]'}
     ${
       btnName === 'Повернутися'
         ? 'text-auth-dark border-auth-dark  bg-white hover:opacity-70'
         : !isFormValid || error
           ? 'bg-auth-dark_10 text-auth-light cursor-not-allowed'
           : 'bg-auth-dark_90 text-auth-light hover:opacity-90'
     }
    `}
    >
      {isLoading ? <LoadingButton /> : <>{btnName}</>}
    </button>
  );
};

export default AuthButton;
