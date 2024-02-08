import { AdminSideBar } from '@/components/admin-panel/side-bar/side-bar';
import PrivateProvider from '@/providers/provider-private-route';

export default function AdminLayout({ children }) {
  return (
    <PrivateProvider>
      <div className="min-h-screen w-full bg-admin-light_1">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[298px_1fr]">
          <AdminSideBar />
          {children}
        </div>
      </div>
    </PrivateProvider>
  );
}
