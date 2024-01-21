const AdminHeader = ({ title, children }) => {
  return (
    <div className="flex h-[140px] items-center justify-between pl-[42px] pr-[82px] ">
      <h2 className="text-[40px]">{title}</h2>
      {children}
    </div>
  );
};

export default AdminHeader;
