import { useContext } from "react";
import { PizzasContext } from "../context/PizzaProvider";
import { formatoNumero } from "../formatoNumero.js";

const Carrito = () => {
  const { cart, addToCart, removeFromCart } = useContext(PizzasContext);

  return (
    <div className="container mt-5">
      <h2>Detalles del pedido:</h2>
      <div className="carrito-lista">
        {cart.map((pizza, index) => (
          <div key={index} className="carrito-item py-3">
            <div className="d-flex align-items-center">
              <img
                src={pizza.img}
                className="img-fluid rounded-start me-3"
                alt={pizza.name}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5 className="card-title mb-1">{pizza.name}</h5>
                <p className="card-text mb-1">Precio: ${formatoNumero(pizza.price)}</p>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(pizza)}
                >
                  -
                </button>
                <span className="mx-3">{pizza.quantity}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(pizza)}
                >
                  +
                </button>
              </div>
            </div>
            {index < cart.length - 1 && <hr />} {}
          </div>
        ))}
      </div>
      <div className="total-container mt-4">
        <h3>Total: ${formatoNumero(cart.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0))}</h3>
        <button className="btn btn-success mt-2">Ir a pagar</button>
      </div>
    </div>
  );
};

export default Carrito;
