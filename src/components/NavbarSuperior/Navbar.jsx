import { useContext } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { ProductosContext } from "../../context/ProductoProvider";

const Navbar = () => {
=======
import { formatoNumero } from "../../formatoNumero.js";

const Navbar = () => {

>>>>>>> dbaf0b22e12c47ad115b929ac8733ddc4993333b
  const navegar = useNavigate(); 
  const { totalArticulosCarrito, seleccionarCategoria } = useContext(ProductosContext);

  const loginClick = () => navegar("/login");
  const registroClick = () => navegar("/registrar-usuario");

  const handleCategoriaClick = (categoria) => {
    seleccionarCategoria(categoria);
    navegar("/"); 
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2 bg-dark text-white">
        {/* Redes sociales */}
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
          <button onClick={registroClick} className="text-white me-3 btn btn-link">Registrarse</button>
          <button onClick={loginClick} className="text-white btn btn-link">Iniciar sesión</button>
        </div>
      </div>

      <div className="navbar text-white py-3">
        <div className="container d-block">
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={() => navegar("/")} className="logo-nombre mx-1 mb-0 btn btn-link text-white">
              <h4 className="mb-0">&#127918; Marketplace de Videojuegos</h4>
            </button>
            <div className="d-flex gap-4">
              <button onClick={() => handleCategoriaClick("juegos")} className="nav-link btn btn-link text-white">Juegos</button>
              <button onClick={() => handleCategoriaClick("accesorios")} className="nav-link btn btn-link text-white">Accesorios</button>
              <button onClick={() => handleCategoriaClick("consolas")} className="nav-link btn btn-link text-white">Consolas</button>
              <button onClick={() => handleCategoriaClick("implementos")} className="nav-link btn btn-link text-white">Implementos</button>
            </div>

            <div className="d-flex align-items-center">
              <button onClick={() => navegar("/search")} className="btn btn-light d-flex align-items-center me-3">
                <span>&#128269;</span>
              </button>
<<<<<<< HEAD
              <button onClick={() => navegar("/carrito")} className="btn btn-light d-flex align-items-center position-relative">
                <span>&#128722;</span>
                {totalArticulosCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalArticulosCarrito}
                  </span>
                )}
=======
              <button onClick={() => navegar("/carrito")} className="btn btn-light d-flex align-items-center">
                <span>&#128722;</span> 
                <span className="ms-2"></span>
>>>>>>> dbaf0b22e12c47ad115b929ac8733ddc4993333b
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
