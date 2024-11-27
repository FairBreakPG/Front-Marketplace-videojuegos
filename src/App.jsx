import { Route, Routes } from "react-router-dom";
import DetalleProducto from "./views/Detalleproducto.jsx";
import Home from "./views/Home.jsx";
import Navbar from "./components/NavbarSuperior/Navbar.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import CreateProductPage from "./components/CrearProductos/CrearProductos.jsx";
import LoginForm from "./components/loginForm/LoginForm.jsx";
import RegistroForm from "./components/RegistroUsuario/RegistroForm.jsx";
import ProductosVistas from "./views/Productosvista.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="productos/">
          <Route path=":id" element={<DetalleProducto />} />
        </Route>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/" element={<Home />} />
        <Route path="/crear-productos" element={<CreateProductPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registrar-usuario" element={<RegistroForm />} />
        <Route path="/vista-producto" element={<ProductosVistas />}/>
      </Routes>
    </div>
  );
};

export default App;
