import HeroSlider from './hero-slider';

export function Hero() {
  return (
    <section className="h-[620px] max-w-full pt-[80px] tablet:h-[800px]">
      <div className="relative h-[540px] w-full tablet:h-[720px]">
        <HeroSlider />
      </div>
    </section>
  );
}
