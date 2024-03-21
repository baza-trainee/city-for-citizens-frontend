import IconAttention from '@/assets/icons/common/attention.svg';

export default function ErrorMessage({ error }) {
  return (
    <div className="flex gap-5 rounded border border-state-error_main bg-state-error_second px-6 py-5 text-lg leading-[1.3] text-state-error_main">
      <span>
        <IconAttention className="w-[24px]" />
      </span>
      <p>{error}</p>
    </div>
  );
}
