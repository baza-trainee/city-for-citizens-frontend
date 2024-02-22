export default function CommonModalForm({
  register,

  errors,
  isValid,
  isLoading,
  nameButton,
  close,
}) {
  return (
    <>
      <div className="-mt-1 flex flex-col gap-y-8">
        <div className="relative flex flex-col">
          <div className="mx-4 flex h-12 w-[407px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
            <input
              {...register('ukTypeName')}
              type="text"
              placeholder="Введіть новий тип події українською мовою"
              className="w-full pl-[7px] text-admin-dark outline-none"
            />
          </div>
          {errors.ukTypeName && (
            <div className="absolute -bottom-6 pl-[15px] text-admin-modal-error">
              {errors.ukTypeName.message}
            </div>
          )}
        </div>
        <div className="relative flex flex-col">
          <div className="mx-4 flex h-12 w-[407px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
            <input
              {...register('enTypeName')}
              type="text"
              placeholder="Введіть новий тип події англійською мовою"
              className="w-full pl-[7px] text-admin-dark outline-none "
            />
          </div>
          {errors.enTypeName && (
            <div className="absolute -bottom-6 pl-[15px] text-admin-modal-error">
              {errors.enTypeName.message}
            </div>
          )}
        </div>
      </div>
      <div className="mb-[25px] mt-2  flex gap-[10px]">
        <button
          disabled={isLoading}
          className="button-close-hover w-[198px] pb-3 pt-2"
          onClick={close}
          type="button"
        >
          Скасувати
        </button>
        <button
          disabled={isLoading || !isValid}
          className="button-confirm-hover w-[198px] pb-3 pt-2"
          type="submit"
        >
          {nameButton}
        </button>
      </div>
    </>
  );
}
