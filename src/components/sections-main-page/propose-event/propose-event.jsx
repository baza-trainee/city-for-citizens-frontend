import ProposeForm from './propose-form';

export function ProposeEvent() {
  return (
    <section id="offerEvent" className="flex items-center justify-center">
      <div
        className="flex w-full max-w-[1920px] items-center justify-center px-[16px] py-[120px] laptop:px-[40px]"
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(/images/propose-event-bg.jpg) center/cover no-repeat, lightgray 50%',
        }}
      >
        <ProposeForm />
      </div>
    </section>
  );
}
