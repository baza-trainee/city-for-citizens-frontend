import { PulseLoader } from 'react-spinners';

export function LoadingButton() {
  return (
    <span className="flex items-end justify-center gap-[1px] text-[16px]">
      <span>Зачекайте</span>

      <PulseLoader
        className="-translate-y-[3.5px]"
        color="currentColor"
        speedMultiplier={0.7}
        margin={5}
        size={4}
      />
    </span>
  );
}
