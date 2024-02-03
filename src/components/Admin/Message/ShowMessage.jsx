import IconClose from '../../UI/icons/IconAdminClose';
function ShowMessage({ title = '', type, onClose, children }) {
  return (
    <div
      className={` absolute bottom-0 left-0 right-0 top-0 m-auto flex h-[156px]
       w-[322px] flex-col items-center justify-center  gap-y-3 border-[3px] bg-white text-center ${
         type === 'success' ? 'border-admin-green' : 'border-admin-red'
       }`}
    >
      <IconClose
        width="12"
        height="12"
        onClick={() => onClose()}
        className="absolute right-4 top-[18px] cursor-pointer stroke-admin-dark"
      />
      <h3
        className={`font-exo_2 text-2xl font-bold ${
          type === 'success' ? 'text-admin-green' : 'text-admin-red'
        }`}
      >
        {title}
      </h3>
      <div className="font-source_sans_3 text-lg">{children}</div>
    </div>
  );
}

export default ShowMessage;
