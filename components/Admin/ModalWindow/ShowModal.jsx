import IconClose from '../../UI/icons/IconClose';
function ShowModal({
  title = '',
  bgColor,
  onClose,
  onOk,
  confirmButton,
  children,
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-fit w-2/4 flex-col justify-center  gap-y-3 rounded-xl bg-gray/5 pb-3 text-center">
      <div className={`flex justify-between bg-[${bgColor}] p-1`}>
        {title}
        <IconClose
          width="16"
          height="16"
          onClick={() => onClose()}
          className="ml-auto cursor-pointer stroke-primary/0 text-right"
        />
      </div>
      <div className="p-1">{children}</div>
      <div>
        <button
          className={`bg-[${bgColor}] rounded-lg px-2 py-1`}
          onClick={() => onOk()}
        >
          {confirmButton}
        </button>
      </div>
    </div>
  );
}

export default ShowModal;
