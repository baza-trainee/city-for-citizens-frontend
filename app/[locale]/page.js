import Header from "@/components/header/Header";
import Hero from "@/components/Hero";
import FilteredMap from "@/components/GoogleMaps/FilteredMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FilteredMap />
      </main>
      <Footer />
    </>
  );
}
