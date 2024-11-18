import Header from "../components/Header";
import MultiItemCarousel from "../components/CarruselProductos";
import CarruselHero from "../components/CarruselHero";
import BannerPromocionales from "../components/BannerPromo";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <Header />
      <CarruselHero />
       <BannerPromocionales />
      <MultiItemCarousel />
      <Footer />
    </>
  );
};

export default Home;
