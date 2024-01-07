const Input = ({
  label,
  value,
  onChange,
  name,
  type,
  placeholder,
  errors,
  onBlur,
}) => (
  <>
    <label className="w-full">
      <span>{label}</span>
      <input
        className={`my-1 w-full text-ellipsis rounded-lg border
       border-gray/20 bg-gray/5 p-2.5 placeholder-gray/30  hover:${
         errors ? 'border-error' : 'border-primary/100'
       }  focus:border-primary/100 focus:outline-primary/100
       dark:text-gray/100 dark:focus:shadow-inner dark:focus:shadow-primary/80 dark:focus:outline-primary/100
    `}
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
