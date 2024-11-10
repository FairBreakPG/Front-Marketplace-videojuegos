import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatoNumero } from "../../formatoNumero.js";
import { PizzasContext } from "../../context/PizzaProvider.jsx";

const Navbar = () => {
  const { total } = useContext(PizzasContext);
  const navegar = useNavigate(); 
  const loginClikc = () => navegar("/login");

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
          <button onClick={loginClikc} className="text-white me-3 btn btn-link">Registrarse</button>
          <button onClick={loginClikc} className="text-white btn btn-link">Iniciar sesión</button>
        </div>
      </div>

      <div className="navbar text-white py-3">
        <div className="container d-block">
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={() => navegar("/")} className="logo-nombre mx-1 mb-0 btn btn-link text-white">
              <h4 className="mb-0">&#127918; Marketplace de Videojuegos</h4>
            </button>
            <div className="d-flex gap-4">
              <button onClick={() => navegar("/juegos")} className="nav-link btn btn-link text-white">Juegos</button>
              <button onClick={() => navegar("/accesorios")} className="nav-link btn btn-link text-white">Accesorios</button>
              <button onClick={() => navegar("/consolas")} className="nav-link btn btn-link text-white">Consolas</button>
              <button onClick={() => navegar("/implementos")} className="nav-link btn btn-link text-white">Implementos</button>
            </div>
            <div className="d-flex align-items-center">
              <button onClick={() => navegar("/search")} className="btn btn-light d-flex align-items-center me-3">
                <span>&#128269;</span>
              </button>
              <button onClick={() => navegar("/carrito")} className="btn btn-light d-flex align-items-center">
                <span>&#128722;</span> 
                <span className="ms-2">${formatoNumero(total)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
