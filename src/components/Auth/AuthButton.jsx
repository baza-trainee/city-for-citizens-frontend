import { LoadingButton } from '../UI/LoadingButton';

const AuthButton = ({ error, isFormValid, isLoading, btnName }) => {
  return (
    <button
      disabled={
        (!isFormValid && btnName !== 'Повернутися') ||
        (isLoading && btnName !== 'Повернутися')
      }
      className={` mx-auto block rounded border p-2.5 px-8 py-[10px] text-xl font-bold 
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
