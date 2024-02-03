const AdminHeader = ({ title, children }) => {
  return (
    <header className="flex h-[150px] items-center justify-between  pl-5 pr-20 ">
      <h2 className="text-[40px] font-bold leading-8 text-admin-dark">
        {title}
      </h2>
      {children}
    </header>
  );
};

export default AdminHeader;
