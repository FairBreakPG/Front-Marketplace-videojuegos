import Header from "../components/Header";
import ProductosList from "../components/ProductosList";
import CardProductos from "../components/CardProductos";

const Home = () => {
  return (
    <>
      <Header />
      <ProductosList>
        <CardProductos />
      </ProductosList>
    </>
  );
};

export default Home;
