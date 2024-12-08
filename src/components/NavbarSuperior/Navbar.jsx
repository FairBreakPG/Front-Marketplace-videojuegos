import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../../context/ProductoProvider";
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
  const navegar = useNavigate(); 
  const { usuario, logout } = useAuth();
  const { filtradoCategorias } = useContext(ProductosContext);  

  const loginClick = () => navegar("/login");
  const registroClick = () => navegar("/registrar-usuario");

  const handleCategoriaClick = (categoria) => {
    filtradoCategorias(categoria); 
    navegar("/");  
  };

  const manejarCierreSesion = () => {
    logout(); 
    navegar("/"); 
  };
  
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
          {!usuario ? ( 
            <>
              <button onClick={registroClick} className="text-white me-3 btn btn-link">Registrarse</button>
              <button onClick={loginClick} className="text-white btn btn-link">Iniciar sesión</button>
            </>
          ) : ( 
            <div className="d-flex align-items-center">
              <span className="me-3">Hola, {usuario.nombre}!</span> 
              <button onClick={manejarCierreSesion} className="text-white btn btn-link">Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>

      <div className="navbar text-white py-3 bg-secondary">
        <div className="container d-block">
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={() => navegar("/")} className="logo-nombre mx-1 mb-0 btn btn-link text-white">
              <h4 className="mb-0">&#127918; Tienda Games Fx</h4>
            </button>
            <div className="d-flex gap-4">
              <button onClick={() => handleCategoriaClick("Juegos")} className="nav-link btn btn-link text-white">Juegos</button>
              <button onClick={() => handleCategoriaClick("Accesorios")} className="nav-link btn btn-link text-white">Accesorios</button>
              <button onClick={() => handleCategoriaClick("Consolas")} className="nav-link btn btn-link text-white">Consolas</button>
              <button onClick={() => handleCategoriaClick("Implementos")} className="nav-link btn btn-link text-white">Implementos</button>
            </div>

            <div className="d-flex align-items-center">
              <button onClick={() => navegar("/search")} className="btn btn-light d-flex align-items-center me-3">
                <span>&#128269;</span>
              </button>
              <button onClick={() => navegar("/carrito")} className="btn btn-light d-flex align-items-center position-relative me-3">
                <span>&#128722;</span>
              </button>
              <button onClick={() => navegar("/perfil")} className="btn btn-light d-flex align-items-center me-3">
                <span>&#9881;</span>
              </button>
              <button onClick={() => navegar("/productos")} className="btn btn-light d-flex align-items-center me-3"> 
                <span>&#10133;</span>
              </button>
              <button onClick={() => navegar("/historial")} className="btn btn-light d-flex align-items-center">
                <span>&#128203;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
