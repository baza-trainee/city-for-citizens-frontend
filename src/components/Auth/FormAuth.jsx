const FormAuth = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-[412px] flex-col items-start gap-8"
    >
      {children}
    </form>
  );
};

export default FormAuth;
