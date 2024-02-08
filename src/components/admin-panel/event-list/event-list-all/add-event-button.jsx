import { Link } from '@/navigation';

export default function AddEventButton() {
  return (
    <Link
      className="group block self-center rounded-lg bg-admin-dark px-[1.88rem] py-2.5
        text-center text-xl font-bold text-admin-light_3 transition duration-200 hover:bg-light-button-hover hover:text-[#ffffff] active:bg-admin-darkblue"
      href={'/admin/event'}
    >
      <button type="button" title="Додати подію">
        Додати подію
      </button>
    </Link>
  );
}
