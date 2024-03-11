export const customStylesDatePicker = {
  root: 'font-roboto text-light-head dark:text-dark-head p-[16px] w-[312px] h-[323px]', // calendar wrap

  caption: 'relative mb-4 h-[35px] flex  justify-center items-end', // mouth, nav button
  caption_label:
    'font-ubuntu text-center capitalize text-[32px] leading-[35px] -tracking-[0.154px] font-medium ', //mouth title
  nav: 'absolute top-0  h-[35px] items-center w-full flex justify-between', // nav button wrap
  nav_button: 'w-auto ', // nav button

  table: 'w-full', // wrap - day week name, day mouth number
  tbody: '', // wrap day mouth number
  head_row: ' ', // row with day week name
  row: '', // rows with day mouth number

  head_cell:
    'w-10 h-10 p-0 text-[14px] align-middle  font-normal select-none capitalize ', // wrap/item day week name
  cell: 'p-0 text-center  hover:bg-calendar-hover transition-all hover:rounded hover:dark:text-calendar-default_light', // wrap/item day mouth number
  day: ' w-10 h-10 block text-calendar-default_light dark:text-calendar-default_dark text-[14px] select-none leading-[1.5] -tracking-[0.132px]', // button day mouth number
  day_selected: '', // selected day mouth number
  day_disabled:
    ' text-calendar-disabled_light dark:text-calendar-disabled_dark  pointer-events-none', // disabled day mouth number
  day_range_start: 'bg-calendar-point dark:text-calendar-default_light rounded',
  day_range_end:
    'bg-calendar-point text-calendar-default-light dark:text-calendar-default_light rounded',
  day_range_middle:
    'bg-calendar-selected dark:text-calendar-default_light rounded',
};
