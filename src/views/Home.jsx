import { useContext } from "react";
import CardProductos from "../components/CardProductos";
import { ProductosContext } from "../context/ProductoProvider";

const Home = () => {
  const { productosFiltrados } = useContext(ProductosContext);

  return (
    <div className="row">
      {productosFiltrados.map((producto) => (
        <CardProductos key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default Home;
