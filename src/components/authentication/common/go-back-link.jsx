import Link from 'next/link';

export default function GoBackLink() {
  return (
    <Link
      href="/login"
      className="flex w-[182px] justify-center rounded border  border-auth-dark bg-white py-[10px] text-xl font-bold text-auth-dark hover:bg-admin-button-hover_outlined  active:bg-admin-button-active_outlined"
    >
      Повернутися
    </Link>
  );
}
