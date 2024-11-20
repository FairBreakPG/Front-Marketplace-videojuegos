import { useContext } from "react";
import CardProductos from "../components/CardProductos";
import { ProductosContext } from "../context/ProductoProvider";
import MultiItemCarousel from "../components/CarruselProductos";
import CarruselHero from "../components/CarruselHero";
import BannerPromocionales from "../components/BannerPromo";
import Footer from "../components/Footer";

const Home = () => {
  const { productosFiltrados } = useContext(ProductosContext);

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
