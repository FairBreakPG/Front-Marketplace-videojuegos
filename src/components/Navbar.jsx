import { Link } from "react-router-dom";
import { useContext } from "react";
import { PizzasContext } from "../context/PizzaProvider";
import { formatoNumero } from "../formatoNumero.js";

const Navbar = () => {
  const { total } = useContext(PizzasContext);

  return (
    <div>
     
      <div className="d-flex justify-content-between align-items-center py-2 bg-dark text-white">
        <div className="d-flex gap-3 ms-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className="text-white">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="me-3">
          <Link to="/register" className="text-white me-3">Registrarse</Link>
          <Link to="/login" className="text-white">Iniciar sesión</Link>
        </div>
      </div>

      <div className="navbar text-white py-3">
        <div className="container d-block">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="logo-nombre mx-1 mb-0">
              <h4 className="mb-0">&#127918; Marketplace de Videojuegos</h4>
            </Link>

            <div className="d-flex gap-4">
              <Link to="/juegos" className="nav-link text-white">Juegos</Link>
              <Link to="/accesorios" className="nav-link text-white">Accesorios</Link>
              <Link to="/consolas" className="nav-link text-white">Consolas</Link>
              <Link to="/implementos" className="nav-link text-white">Implementos</Link>
            </div>

            <div className="d-flex align-items-center">
              <Link to="/search" className="btn btn-light d-flex align-items-center me-3">
                <span>&#128269;</span>
              </Link>
              <Link to="/carrito" className="btn btn-light d-flex align-items-center">
                <span>&#128722;</span> 
                <span className="ms-2">${formatoNumero(total)}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
