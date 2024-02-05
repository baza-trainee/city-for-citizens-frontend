import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const FormContainer = ({ children, error, message }) => {
  return (
    <div
      className={`absolute inset-x-0 flex max-h-[120vh] min-h-screen ${error ? 'items-center pb-[7%]' : 'items-center pt-[2%]'} justify-center overflow-y-auto bg-admin-dark bg-opacity-50 `}
    >
      <div className="flex w-[460px] flex-col gap-[30px]">
        {error && <ErrorMessage error={error} />}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          className="bg-auth-light_2 relative  flex flex-col gap-8 rounded-lg p-6 text-auth-dark"
        >
          {children}
        </div>
        {message && <SuccessMessage message={message} />}
      </div>
    </div>
  );
};
export default FormContainer;
