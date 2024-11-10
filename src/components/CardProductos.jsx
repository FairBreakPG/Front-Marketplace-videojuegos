import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../context/ProductoProvider";
import { formatoNumero } from "../formatoNumero.js";

const Card = () => {
  const { productos, addToCart } = useContext(ProductosContext);
  const navigate = useNavigate();

  return (
    <>
      {productos.map((producto) => (
        <div key={producto.id} className="col">
          <div className="card">
            <img className="imagen-car card-img-top" src={producto.img} alt=""  to={`producto/${producto.id}`}
            onClick={() => navigate(`/productos/${producto.id}`)}/>
            <div className="card-body">
              <h4 className="card-title text-capitalize">Producto {producto.name}</h4>
              <hr />
            </div>
            <h2 className="text-center text-dark pb-3">
              Precio: ${formatoNumero(producto.price)}
            </h2>
            <div className="d-flex justify-content-around mb-4">

              <button
                className="btn btn-success BotonAgregar"
                onClick={() => addToCart(producto)}
              >
                AGREGAR
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
