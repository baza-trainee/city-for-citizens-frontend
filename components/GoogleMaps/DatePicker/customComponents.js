import IconNavArrow from '@/components/icons/IconNavArrow';

export const customComponents = {
  IconLeft: props => (
    <IconNavArrow
      className="h-[24px] w-[24px] cursor-pointer rounded-[50%] bg-gray/5 stroke-gray/50 transition-all dark:bg-gray/50 dark:stroke-gray/0"
      alt="Previous Month"
      onClick={props.onClick}
    />
  ),
  IconRight: props => (
    <IconNavArrow
      className="h-[24px] w-[24px]  -rotate-180 cursor-pointer rounded-[50%] bg-gray/5 stroke-gray/50 transition-all dark:bg-gray/50 dark:stroke-gray/0"
      alt="Next Month"
      onClick={props.onClick}
    />
  ),
};
