import IconClose from '@/assets/icons/common/close-icon.svg';

function ShowModal({ title = '', onClose, onOk, children }) {
  return (
    <div
      className="fixed left-0 top-0 h-full w-full
       overflow-auto bg-admin-backdrop bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 m-auto flex h-fit w-fit flex-col justify-center
        gap-y-6 bg-admin-light_3 px-6 py-8 text-center text-admin-dark`}
      >
        <IconClose
          width="12"
          height="12"
          onClick={() => onClose()}
          className="absolute right-[18px] top-5 cursor-pointer stroke-admin-dark"
        />
        <h3 className="font-exo_2 text-2xl font-bold">{title}</h3>
        <div className="font-source_sans_3 text-lg">{children}</div>
        <div className="flex justify-center gap-x-4">
          <button
            className={`flex w-[11.3rem] justify-center rounded-md border border-admin-dark pb-[10px] pt-[7px] font-exo_2 text-xl font-bold text-admin-dark`}
            onClick={() => onClose()}
          >
            Скасувати
          </button>
          <button
            className={`flex w-[11.3rem] justify-center rounded-md bg-admin-dark pb-[10px] pt-[7px] font-exo_2 text-xl font-bold text-admin-light_3`}
            onClick={() => onOk()}
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
