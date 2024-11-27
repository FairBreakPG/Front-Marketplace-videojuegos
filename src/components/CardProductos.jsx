import { useContext } from "react";
import { ProductosContext } from "../context/ProductoProvider";
import { useNavigate } from "react-router-dom";

const CardProductos = ({ producto }) => {
  const { addToCart } = useContext(ProductosContext);
  const navigate = useNavigate();
  

  return (
    <div className="col my-2">
      <div className="card">
        <img className="imagen-car card-img-top" src={producto.img} alt={producto.name}  
        to={`producto/${producto.id}`}
        onClick={() => navigate(`/productos/${producto.id}`)}/>
        <div className="card-body">
          <h4 className="card-title text-capitalize">Producto {producto.name}</h4>
          <hr />
        </div>
        <h2 className="text-center text-dark pb-3">
          Precio: ${producto.price}
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
  );
};

export default CardProductos;
