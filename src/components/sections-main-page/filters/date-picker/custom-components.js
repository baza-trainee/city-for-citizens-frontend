import IconNavArrow from '@/assets/icons/filters/nav-arrow-icon.svg';

export const customComponents = {
  IconLeft: props => (
    <IconNavArrow
      className="bg-gray/5 stroke-gray/50 dark:bg-gray/50 dark:stroke-gray/0 h-[24px] w-[24px] cursor-pointer rounded-[50%] transition-all"
      alt="Previous Month"
      onClick={props.onClick}
    />
  ),
  IconRight: props => (
    <IconNavArrow
      className="bg-gray/5 stroke-gray/50  dark:bg-gray/50 dark:stroke-gray/0 h-[24px] w-[24px] -rotate-180 cursor-pointer rounded-[50%] transition-all"
      alt="Next Month"
      onClick={props.onClick}
    />
  ),
};
