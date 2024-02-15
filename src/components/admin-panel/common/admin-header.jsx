const AdminHeader = ({ title, children }) => {
  return (
    <header className="flex h-[170px] items-center justify-between pb-[10px]  pl-5 tablet:mr-5 desktop:mr-20">
      <h2 className="font-source_sans_3 text-[40px] font-bold leading-8 text-admin-dark">
        {title}
      </h2>
      {children}
    </header>
  );
};

export default AdminHeader;
