'use client';

import { NAVIGATION } from '@/helpers/constants';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { Link, useRouter } from '@/navigation';
import { logout } from '@/services/authAPI';

const AdminMenu = () => {
  const { isLoggedIn } = useIsLoggedIn();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    router.push(NAVIGATION.login);
  };

  return (
    <>
      {isLoggedIn && (
        <div className="flex gap-[15px]">
          <Link href="/admin">Add Event</Link>
          <Link href="/admin/events">Event List</Link>
          <button
            className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[5px]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}{' '}
    </>
  );
};
export default AdminMenu;
