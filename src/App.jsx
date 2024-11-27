/*
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import DetalleProducto from "./views/Detalleproducto.jsx";
import Home from "./views/Home.jsx";
import Navbar from "./components/NavbarSuperior/Navbar.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import CreateProductPage from "./components/CrearProductos/CrearProductos.jsx";
import LoginForm from "./components/loginForm/LoginForm.jsx";
import RegistroForm from "./components/RegistroUsuario/RegistroForm.jsx";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const navigate = useNavigate(); 
  const location = useLocation();  
  const handleLoginSubmit = (userData) => {
    console.log("Login exitoso:", userData);
    localStorage.setItem('token', userData.token);
    navigate('/');
  };
  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<CreateProductPage />} /> 
  <Route path="/productos/:id" element={<DetalleProducto />} /> 
  <Route path="/carrito" element={<Carrito />} />
  <Route path="/crear-productos" element={<CreateProductPage />} />
  <Route path="/login" element={<LoginForm onSubmit={handleLoginSubmit} />} />
  <Route path="/registrar-usuario" element={<RegistroForm />} />
</Routes>
    
    </div>
  );
};

export default App;
*/
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DetalleProducto from "./views/Detalleproducto.jsx";
import Home from "./views/Home.jsx";
import Navbar from "./components/NavbarSuperior/Navbar.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import CreateProductPage from "./components/CrearProductos/CrearProductos.jsx";
import LoginForm from "./components/loginForm/LoginForm.jsx";
import RegistroForm from "./components/RegistroUsuario/RegistroForm.jsx";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSubmit = (userData) => {
    console.log("Login exitoso:", userData);
    localStorage.setItem('token', userData.token);
    navigate('/');
  };

  return (
    <BrowserRouter basename="/Front-Marketplace-videojuegos"> {/* Ajusta la base */}
      <div>
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<CreateProductPage />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/crear-productos" element={<CreateProductPage />} />
          <Route path="/login" element={<LoginForm onSubmit={handleLoginSubmit} />} />
          <Route path="/registrar-usuario" element={<RegistroForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;


