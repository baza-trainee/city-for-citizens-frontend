import IconClose from '../../UI/icons/IconClose';
import { useTheme } from 'next-themes';
function ShowModal({
  title = '',
  bgColor,
  onClose,
  onOk,
  confirmButton,
  children,
}) {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 m-auto flex h-fit w-2/4 flex-col justify-center  gap-y-3 rounded-xl pb-3 text-center ${
        resolvedTheme === 'dark' ? 'bg-gray/80' : 'bg-gray/5'
      }`}
    >
      <div className={`flex justify-between bg-[${bgColor}] rounded-t-lg p-1`}>
        {title}
        <IconClose
          width="16"
          height="16"
          onClick={() => onClose()}
          className="ml-auto cursor-pointer stroke-gray/5 text-right transition duration-200 hover:scale-105"
        />
      </div>
      <div className="p-1">{children}</div>
      <div>
        <button
          className={`bg-[${bgColor}] rounded-lg px-2 py-1 text-gray/5 transition duration-200 hover:saturate-200`}
          onClick={() => onOk()}
        >
          {confirmButton}
        </button>
      </div>
    </div>
  );
}

export default ShowModal;
