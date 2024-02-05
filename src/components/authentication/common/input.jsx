import IconEyeOpen from '@/assets/icons/eyes-password/password-visible.svg';
import IconEyeClose from '@/assets/icons/eyes-password/password-protected.svg';

export default function Input({
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
}) {
  return (
    <label className="w-full pb-[22px] text-start">
      <span className="text-lg leading-none">{label}</span>
      <div className="relative">
        <input
          className={` w-full text-ellipsis rounded
       border bg-auth-light py-3 pl-2 pr-12 leading-[1.35] placeholder-auth-dark_10 ${
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
        {name.includes('password') && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(name)}
            className={`bg-gray/5 absolute right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer
            items-center justify-center`}
          >
            {showPassword ? <IconEyeOpen /> : <IconEyeClose />}
          </button>
        )}
      </div>
      {errors && (
        <p className="absolute pt-[2px] text-state-error_main">{errors}</p>
      )}
    </label>
  );
}
