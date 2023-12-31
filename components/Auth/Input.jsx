const Input = ({ label, value, onChange, name, type, placeholder }) => (
  <label className="w-full">
    <span>{label}</span>
    <input
      className="mt-1 w-full cursor-pointer text-ellipsis rounded-lg border border-gray/20 bg-gray/5 p-2.5 placeholder-gray/30 hover:border-primary/100 focus:outline-gray/100 dark:text-gray/100 "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
    />
  </label>
);

export default Input;
