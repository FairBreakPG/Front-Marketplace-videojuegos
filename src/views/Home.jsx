<<<<<<< HEAD
import { useContext } from "react";
import CardProductos from "../components/CardProductos";
import { ProductosContext } from "../context/ProductoProvider";
=======
import Header from "../components/Header";
import MultiItemCarousel from "../components/CarruselProductos";
import CarruselHero from "../components/CarruselHero";
import BannerPromocionales from "../components/BannerPromo";
import Footer from "../components/Footer";

>>>>>>> luis

const Home = () => {
  const { productosFiltrados } = useContext(ProductosContext);

  return (
<<<<<<< HEAD
    <div className="row">
      {productosFiltrados.map((producto) => (
        <CardProductos key={producto.id} producto={producto} />
      ))}
    </div>
=======
    <>
      <Header />
      <CarruselHero />
       <BannerPromocionales />
      <MultiItemCarousel />
      <Footer />
    </>
>>>>>>> luis
  );
};

export default Home;
