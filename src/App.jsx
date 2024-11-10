import { Route, Routes } from "react-router-dom";
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import Navbar from "./components/NavbarSuperior/Navbar.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import CreateProductPage from "./components/CrearProductos/CrearProductos.jsx";
import LoginForm from "./components/loginForm/LoginForm.jsx";
import RegistroForm from "./components/RegistroUsuario/RegistroForm.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="pizzas/">
          <Route path=":id" element={<Detalle />} />
        </Route>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/" element={<Home />} />
        <Route path="/crear-productos" element={<CreateProductPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registrar-usuario" element={<RegistroForm />} />
      </Routes>
    </div>
  );
};

export default App;
