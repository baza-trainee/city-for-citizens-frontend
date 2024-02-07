export default function FormTitles({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-[30px]">
      <h2 className="text-auth-dark_90 text-[40px] font-bold leading-none">
        {title}
      </h2>
      <h3 className="text-lg font-semibold leading-[1.35]">{subtitle}</h3>
    </div>
  );
}
