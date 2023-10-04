import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChooseCity from "@/components/GoogleMaps/ChooseCity"
import Map from "@/components/GoogleMaps/Map";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className='relative z-10 flex justify-center gap-5 mt-[44px] mb-[29px]'>
          <ChooseCity />
        </section>
        <Map />
      </main>
      <Footer />
    </>
  );
}
