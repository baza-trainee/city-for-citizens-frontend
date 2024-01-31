import IconAttention from '../UI/icons/IconAttention';

const ErrorMessage = ({ error }) => {
  return (
    <div className="absolute left-0 top-[-142px] flex gap-5 rounded border border-state-error_main bg-state-error_second px-6 py-5 text-lg leading-[1.3] text-state-error_main">
      <span className="w-[24px]">
        <IconAttention />
      </span>
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
