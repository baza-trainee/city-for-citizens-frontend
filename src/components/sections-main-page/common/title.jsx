export function Title({ text, className }) {
  return (
    <h2
      className={`font-ubuntu text-[30px]/[33px] font-bold text-light-head dark:text-dark-accent tablet:text-[43px]/[47px] ${className}`}
    >
      {text}
    </h2>
  );
}
