export const customStylesDatePicker = {
  root: 'text-gray/50 dark:text-gray/0 p-[16px] ', // calendar wrap

  caption:
    'relative mb-[20px] tablet:mb-[10px] h-[24px] flex justify-center items-end', // mouth, nav button
  caption_label:
    'text-center capitalize text-[14px] leading-[1.5] -tracking-[0.154px]  text-gray/50 dark:text-gray/0 ', //mouth title
  nav: 'absolute top-0 w-full flex justify-between', // nav button wrap
  nav_button: 'w-auto', // nav button

  table: 'w-full flex flex-col gap-[20px] tablet:gap-[15px] desktop:gap-[20px]', // wrap - day week name, day mouth number
  tbody: 'flex flex-col gap-[20px] tablet:gap-[15px] desktop:gap-[20px]', // wrap day mouth number
  head_row: 'flex justify-between', // row with day week name
  row: 'flex justify-between ', // rows with day mouth number

  head_cell:
    'w-[25px] desktop:w-[20px] p-0 text-[12px] text-gray/100/50 dark:text-gray/0/50 font-normal select-none capitalize ', // wrap/item day week name
  cell: 'p-0 text-center', // wrap/item day mouth number
  button:
    'text-gray/100 dark:text-gray/0  w-[25px] desktop:w-[20px] block hover:text-primary/80 dark:hover:text-primary/80 text-[12px] select-none leading-[1.5] -tracking-[0.132px]', // button day mouth number

  day_selected: 'text-primary/80 dark:text-primary/80', // selected day mouth number
  day_disabled: 'opacity-100 !text-gray/30/50   pointer-events-none', // disabled day mouth number
};
