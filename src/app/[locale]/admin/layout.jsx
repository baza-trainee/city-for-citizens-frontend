import { AdminSideBar } from '@/components/admin-panel/side-bar/side-bar';

export default function AdminLayout({ children }) {
  return (
    <div className="grid h-screen grid-cols-[298px_1fr]">
      <AdminSideBar />
      {children}
    </div>
  );
}
