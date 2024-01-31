const FormContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-admin-dark bg-opacity-50 ">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        className="fixed left-1/2 top-1/2 mt-4 flex -translate-x-1/2 -translate-y-1/2 transform  flex-col gap-8 rounded-lg bg-admin-light_2  p-6 "
      >
        {children}
      </div>
    </div>
  );
};
export default FormContainer;
