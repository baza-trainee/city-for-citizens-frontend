import { LoadingButton } from '../UI/LoadingButton';

const AuthButton = ({ error, isFormValid, isLoading, btnName }) => {
  return (
    <button
      disabled={
        (!isFormValid && btnName !== 'Повернутися') ||
        (isLoading && btnName !== 'Повернутися')
      }
      className={`block rounded border p-2.5 px-8 py-[10px] text-xl font-bold 
     ${
       !isFormValid || error
         ? 'cursor-not-allowed bg-auth-dark_10 text-auth-light'
         : 'bg-auth-dark_90 text-auth-light hover:opacity-90'
     }
    `}
    >
      {isLoading ? <LoadingButton /> : <>{btnName}</>}
    </button>
  );
};

export default AuthButton;
