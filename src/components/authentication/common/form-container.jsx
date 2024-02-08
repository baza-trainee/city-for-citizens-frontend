import ErrorMessage from './error-message';
import SucceessMessage from './success-message';

export default function FormContainer({ children, error, message }) {
  return (
    <div
      className={`absolute inset-x-0 flex max-h-[120vh] min-h-screen ${error ? 'items-center pb-[7%]' : 'items-center pt-[3%]'} justify-center overflow-y-auto bg-admin-dark bg-opacity-50 `}
    >
      <div className="flex w-[460px] flex-col gap-[30px]">
        {error && <ErrorMessage error={error} />}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          className="relative flex  flex-col gap-8 rounded-lg bg-auth-light_2 p-6 text-auth-dark"
        >
          {children}
        </div>
        {message && <SucceessMessage message={message} />}
      </div>
    </div>
  );
}
