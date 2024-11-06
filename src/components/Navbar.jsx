import { Link } from "react-router-dom";
import { useContext } from "react";
import { PizzasContext } from "../context/PizzaProvider";
import { formatoNumero } from "../formatoNumero.js";

const Navbar = () => {
  const { total } = useContext(PizzasContext);

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
          </Link>
          <div className="d-flex align-items-center">
            <Link to="/carrito" className="btn btn-light d-flex align-items-center">
              <span>&#128722;</span>
              <span className="ms-2">${formatoNumero(total)}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
