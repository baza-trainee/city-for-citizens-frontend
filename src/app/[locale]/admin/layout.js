import { AdminSideBar } from '@/components/Admin/AdminSideBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="grid h-screen grid-cols-[298px_1fr] bg-admin-light_1">
      <AdminSideBar />
      {children}
    </div>
  );
};
export default AdminLayout;
