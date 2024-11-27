// import { useContext } from "react";
// import CardProductos from "../components/CardProductos";
// import { ProductosContext } from "../context/ProductoProvider";
import CarruselHero from "../components/CarruselHero";
import BannerPromo from "../components/BannerPromo";
import CarruselProductos from "../components/CarruselProductos";
import Footer from "../components/Footer";
const Home = () => {
  // const { productosFiltrados } = useContext(ProductosContext);

  return (
    <>
    < CarruselHero />
     < BannerPromo />
    {/* <div className="row">
      {productosFiltrados.map((producto) => (
        <CardProductos key={producto.id} producto={producto} />
      ))}
    </div>  */}
    <CarruselProductos />
    <Footer />
    </>

  );
};

export default Home;
