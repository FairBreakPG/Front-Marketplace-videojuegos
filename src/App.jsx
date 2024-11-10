import { Route, Routes } from "react-router-dom";
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import Carrito from "./views/Carrito.jsx";
import Navbar from "./components/Navbar.jsx";  
import CreateProductPage from "./views/CrearProductos.jsx";
const App = () => {
  return (
    <div>
      <Navbar /> {}
      <Routes>
        <Route path="pizzas/">
          <Route path=":id" element={<Detalle />} />
        </Route>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/" element={<Home />} />
        <Route path="/crear-productos" element={<CreateProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
