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
    <label className="w-full pb-[22px] text-start">
      <span className="leading-[1]">{label}</span>
      <input
        className={`placeholder-admin-light_0 mt-1 w-full text-ellipsis
       rounded border bg-admin-light_1 py-3 pl-2 pr-12 leading-[1.35] ${
         errors ? 'border-state-error_main' : 'border-admin-light_0'
       }
    `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type={type}
        required
      />
      {errors && (
        <p className="absolute pt-[2px] text-state-error_main">{errors}</p>
      )}
    </label>
  </>
);

export default Input;
