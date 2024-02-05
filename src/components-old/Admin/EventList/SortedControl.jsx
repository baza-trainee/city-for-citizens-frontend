import IconSort from '../../UI/icons/IconSort';
import { useTheme } from 'next-themes';
const SortedControl = props => {
  const { resolvedTheme } = useTheme();
  return (
    <span className="inline-flex flex-col gap-[1px] ">
      <IconSort
        width="10"
        height="7"
        onClick={e => props.handleClickSortZA(e)}
        className={`inline rotate-180 cursor-pointer  hover:fill-primary/100 ${
          props.direction === 'za'
            ? 'fill-primary/100'
            : resolvedTheme === 'dark'
              ? 'fill-gray/30'
              : 'fill-[#121923]'
        }`}
      />
      <IconSort
        width="10"
        height="7"
        onClick={e => props.handleClickSortAZ(e)}
        className={`inline cursor-pointer self-center pl-[1px] hover:fill-primary/100 ${
          props.direction === 'az'
            ? 'fill-primary/100'
            : resolvedTheme === 'dark'
              ? 'fill-gray/30'
              : 'fill-[#121923]'
        }`}
      />
    </span>
  );
};

export default SortedControl;
