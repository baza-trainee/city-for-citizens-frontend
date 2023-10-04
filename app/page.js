import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Map from "@/components/Map";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Map />
      </main>
      <Footer />
    </>
  );
}
