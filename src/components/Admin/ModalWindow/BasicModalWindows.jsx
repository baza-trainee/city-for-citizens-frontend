import CloseButton from '@/components/UI/icons/IconClose';

const BasicModalWindows = ({ onClose, message, children }) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 h-full w-full bg-primary/0/20"
      ></div>
      <div className="fixed left-1/2 top-1/2 max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-gray/5 px-[50px] py-[30px] dark:bg-gray/80">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-[10px] top-[10px]"
        >
          <CloseButton className="h-[24px] w-[24px] stroke-gray/100 dark:stroke-gray/0" />
        </button>
        <p>{message}</p>
        <p>{children}</p>
      </div>
    </>
  );
};

export default BasicModalWindows;
