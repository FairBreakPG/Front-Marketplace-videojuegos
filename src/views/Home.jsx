import MultiItemCarousel from "../components/CarruselProductos";
import CarruselHero from "../components/CarruselHero";
import BannerPromocionales from "../components/BannerPromo";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <CarruselHero />
      <BannerPromocionales />
      <MultiItemCarousel />
      <Footer />
    </>
  );
};

export default Home;
