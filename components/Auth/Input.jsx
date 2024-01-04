const Input = ({
  label,
  value,
  onChange,
  name,
  type,
  placeholder,
  errors,
  error,
  onBlur,
  onFocus,
}) => (
  <>
    <label className="w-full">
      <span>{label}</span>
      <input
        className={`my-1 w-full text-ellipsis rounded-lg border  bg-gray/5 p-2.5 placeholder-gray/30  hover:${
          errors ? 'border-error' : 'border-primary/100'
        } focus:outline-gray/100 dark:text-gray/100
      ${errors || error ? 'border-error' : 'border-gray/20'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type={type}
        required
      />
      {errors && <p className="text-error">{errors}</p>}
    </label>
  </>
);

export default Input;
