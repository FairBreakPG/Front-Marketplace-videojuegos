import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../../context/ProductoProvider";


const Navbar = () => {
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
            
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item dropdown">
                      <button onClick={() => handleCategoriaClick("juegos")} className="nav-link btn btn-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">Juegos</button>
                      <div class="row dropdown-menu custom-dropdown-width">
                          <div className="d-flex">
                            
                        <div className="col mb-3">
                            <h5>PlayStation</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 3</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 4</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 5</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Nintendo</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">3DS</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">WII</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">WII U</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Microsoft</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX 360</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX ONE</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX SERIES</a></li>
                            </ul>
                          </div>

                          </div>
                        </div>
                      </li>
                      <li class="nav-item dropdown">
                      <button onClick={() => handleCategoriaClick("accesorios")} className="nav-link btn btn-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">Accesorios</button>
                      <div class="row dropdown-menu custom-dropdown-width">
                          <div className="d-flex">
                            
                        <div className="col mb-3">
                            <h5>PlayStation</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PSP</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">VITA</a></li>
                            <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 3</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 4</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 5</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Nintendo</h5>
                            <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">DS</a></li>
                            <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">3DS</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">WII</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">WII U</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">SWITCH</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Microsoft</h5>
                            <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX 360</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX ONE</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX SERIES</a></li>
                            </ul>
                          </div>

                          </div>
                        </div>
                      </li>
                      <li class="nav-item dropdown">
                      <button onClick={() => handleCategoriaClick("consolas")} className="nav-link btn btn-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">Consolas</button>
                      <div class="row dropdown-menu custom-dropdown-width">
                          <div className="d-flex">
                            
                        <div className="col mb-3">
                            <h5>PlayStation</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 4</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">PlayStation 5</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Nintendo</h5>
                            <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">SWITCH</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Microsoft</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">XBOX SERIES</a></li>
                            </ul>
                          </div>

                          </div>
                        </div>
                      </li>
                      <li class="nav-item dropdown">
                      <button onClick={() => handleCategoriaClick("implementos")} className="nav-link btn btn-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">Implementos</button>
                    
                        <div class="row dropdown-menu custom-dropdown-width">
                          <div className="d-flex">

                        <div className="col mb-3">
                            <h5>Accesorios</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Camaras</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Carcasas</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Discos externos</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">GPS</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Pendrives</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Perifericos</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Audifonos</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Cables</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Monitores</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Parlantes</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Teclados</a></li>
                            </ul>
                          </div>

                          <div className="col mb-3">
                            <h5>Gamers</h5>
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Microfonos</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Controles</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Mouses</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Sillas</a></li>
                              <li className="nav-item mb-2"><a href="#" onClick={() => navegar("/vista-producto")} className="nav-link p-0 text-body-secondary">Mousepad</a></li>
                            </ul>
                          </div>

                          </div>
                        </div>
                      
                      </li>
                    </ul>
                    
                  </div>
                </div>
              </nav>

            <div className="d-flex align-items-center">
              <button onClick={() => navegar("/search")} className="btn btn-light d-flex align-items-center me-3">
                <span>&#128269;</span>
              </button>
              <button onClick={() => navegar("/carrito")} className="btn btn-light d-flex align-items-center position-relative">
                <span>&#128722;</span>
                {totalArticulosCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalArticulosCarrito}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
