import { AdminSideBar } from '@/components/admin-panel/side-bar/side-bar';
import PrivateProvider from '@/providers/provider-private-route';

export default function AdminLayout({ children }) {
  return (
    <PrivateProvider>
      <div className="grid h-screen grid-cols-[298px_1fr]">
        <AdminSideBar />
        {children}
      </div>
    </PrivateProvider>
  );
}