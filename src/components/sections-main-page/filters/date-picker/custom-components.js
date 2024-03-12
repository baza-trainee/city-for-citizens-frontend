import IconNavArrow from '@/assets/icons/filters/nav-arrow-icon.svg';

export const customComponents = {
  IconLeft: props => (
    <IconNavArrow
      className="h-[24px] w-[24px] cursor-pointer bg-light-secondary stroke-icon transition-all dark:bg-dark-secondary"
      alt="Previous Month"
      onClick={props.onClick}
    />
  ),
  IconRight: props => (
    <IconNavArrow
      className="h-[24px] w-[24px] -rotate-180 cursor-pointer bg-light-secondary stroke-icon transition-all dark:bg-dark-secondary"
      alt="Next Month"
      onClick={props.onClick}
    />
  ),
};
