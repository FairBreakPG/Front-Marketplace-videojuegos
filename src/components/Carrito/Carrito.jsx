import { useContext } from "react";
import { ProductosContext } from "../../context/ProductoProvider";

const Carrito = () => {
  const { cart, total, removeFromCart } = useContext(ProductosContext);

  return (
    <div className="container">
      <h2>Mi Carrito</h2>

      {cart && cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((producto) => (
              <li key={producto.id} className="d-flex align-items-center mb-3">
                <img
                  src={producto.img}
                  alt={producto.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }}
                />
                <div className="d-flex justify-content-between w-100">
                  <span>{producto.name}</span>
                  <span>Precio: ${producto.price}</span>
                  <span>Cantidad: {producto.quantity}</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(producto)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-end">
            <h3>Total: ${total}</h3>
          </div>
        </div>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Carrito;
