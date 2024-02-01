const FormAuth = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex flex-col items-start gap-8"
    >
      {children}
    </form>
  );
};

export default FormAuth;
