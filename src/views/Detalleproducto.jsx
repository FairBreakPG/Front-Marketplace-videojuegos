import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductosContext } from "../context/ProductoProvider";


const DetalleProducto = () => {
  const [productoDetail, setProductoDetail] = useState({});
  const { productos, addToCart, removeFromCart } = useContext(ProductosContext);
  const { id } = useParams();

  const obtenerDatos = () => {
    const datosProducto = productos.find((producto) => producto.id === id);

    setProductoDetail(datosProducto || {});
  };

  useEffect(() => {
    obtenerDatos();
  }, [productos]);

  return (
    <>
   
      <div className="container mt-5">
        <div className="card mb-3 estilos">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={productoDetail.img}
                className="img-fluid estilos rounded-start"
                alt={productoDetail.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {productoDetail.name}
                </h5>
                  <h2>Precio: ${productoDetail.price}</h2>
                <div className="d-flex justify-content-start">
                  
                  <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => removeFromCart(productoDetail)}
                >
                  -
                </button>
                <span className="mx-3">{productoDetail.quantity}</span>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addToCart(productoDetail)}
                >
                  +
                </button>
              </div>
                  <button
                    className="btn btn-success BotonAgregar ms-4"
                    onClick={() => addToCart(productoDetail)}
                  >
                    AGREGAR 
                  </button>
                
                </div>
                <h3>Descripción:</h3>
                <p className="card-text">{productoDetail.desc}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default DetalleProducto;
