import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChooseCity from "@/components/GoogleMaps/ChooseCity";
import DatePicker from "@/components/GoogleMaps/DatePicker";
import ChooseEventType from "@/components/GoogleMaps/ChooseEventType";
import Map from "@/components/GoogleMaps/Map";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="relative z-10 flex justify-center gap-5 mt-11 mb-[29px]">
          <ChooseCity />
          <DatePicker />
          <ChooseEventType />
        </section>
        <Map />
      </main>
      <Footer />
    </>
  );
}
