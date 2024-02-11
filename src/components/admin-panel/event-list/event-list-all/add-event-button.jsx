import { Link } from '@/navigation';
import { useStyleMediaQuery } from '@/hooks';
import IconPlus from '@/assets/icons/common/plus-icon.svg';

export default function AddEventButton() {
  const { matches: isMobile } = useStyleMediaQuery({
    mixOrMax: 'max',
    widthOrHeight: 'width',
    value: 768,
  });

  return (
    <Link
      className="group  block max-w-[188px] self-center justify-self-end rounded-lg bg-admin-dark
       py-2.5 text-center font-bold text-admin-light_3  transition duration-200 hover:bg-light-button-hover hover:text-[#ffffff]
        active:bg-admin-darkblue tablet:px-3 laptop:px-3 laptop:text-base
          desktop:px-[1.88rem] desktop:text-xl"
      href={'/admin/event'}
    >
      <button type="button" title="Додати подію">
        {!isMobile ? (
          'Додати подію'
        ) : (
          <IconPlus
            width="14"
            height="14"
            className="fill-gray/80 inline transition duration-200 group-hover:fill-[#ffffff]"
          />
        )}
      </button>
    </Link>
  );
}
