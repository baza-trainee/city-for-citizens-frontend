import IconEyeOpen from '../UI/icons/eyes/IconEyeOpen';
import IconEyeClose from '../UI/icons/eyes/IconEyeClose';

const Input = ({
  label,
  value,
  onChange,
  name,
  type,
  placeholder,
  errors,
  onBlur,
  showPassword,
  togglePasswordVisibility,
}) => (
  <>
    <label className="w-full pb-[22px] text-start">
      <span className="text-lg leading-none">{label}</span>
      <div className="relative">
        <input
          className={` placeholder-auth-dark_10 w-full text-ellipsis
       rounded border bg-admin-light_1 py-3 pl-2 pr-12 leading-[1.35] ${
         errors ? 'border-state-error_main' : 'border-auth-dark_10'
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
        {name === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className={`absolute right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer items-center
            justify-center bg-gray/5`}
          >
            {showPassword ? <IconEyeOpen /> : <IconEyeClose />}
          </span>
        )}
      </div>
      {errors && (
        <p className="absolute pt-[2px] text-state-error_main">{errors}</p>
      )}
    </label>
  </>
);

export default Input;
