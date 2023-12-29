function ShowMessage({ bgColor, children }) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 m-auto flex h-fit w-2/4 flex-col justify-center  gap-y-3 rounded-xl bg-[${bgColor}] text-center`}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export default ShowMessage;
