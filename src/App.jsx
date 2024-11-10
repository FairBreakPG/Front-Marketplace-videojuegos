import { Route, Routes } from "react-router-dom";
import DetalleProducto from "./views/Detalleproducto.jsx";
import Home from "./views/Home.jsx";
import Carrito from "./views/Carrito.jsx";
import Navbar from "./components/Navbar.jsx";  
const App = () => {
  return (
    <div>
      <Navbar /> {}
      <Routes>
        <Route path="productos/">
          <Route path=":id" element={<DetalleProducto />} />
        </Route>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
