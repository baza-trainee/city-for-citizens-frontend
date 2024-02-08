const AdminHeader = ({ title, children }) => {
  return (
    <header className="flex h-40 items-center justify-between  pl-5 pr-20">
      <h2 className="font-source_sans_3 text-[40px] font-bold leading-8 text-admin-dark">
        {title}
      </h2>
      {children}
    </header>
  );
};

export default AdminHeader;
