import { useContext } from "react";
import { formatoNumero } from "../../formatoNumero.js";

const Carrito = () => {
  const { cart, addToCart, removeFromCart } = useContext(PizzasContext);

  return (
    <div className="container mt-5">
      <h2>Detalles de tu Carrito</h2>
      <div className="carrito-lista mt-4">
        {cart.map((game, index) => (
          <div key={index} className="carrito-item py-3 border-bottom">
            <div className="d-flex align-items-center">
             
              <img
                src={game.img}
                alt={game.name}
                className="img-fluid rounded me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h5 className="card-title mb-1">{game.name}</h5>
                <p className="card-text text-muted mb-1">Plataforma: {game.platform}</p>
                <p className="card-text mb-1">Precio: ${formatoNumero(game.price)}</p>
              </div>
             
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromCart(game)}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="mx-3">{game.quantity}</span>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => addToCart(game)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            {index < cart.length - 1 && <hr />} 
          </div>
        ))}
      </div>
      
    
      <div className="total-container mt-4 text-end">
        <h3>Total: ${formatoNumero(cart.reduce((acc, game) => acc + game.price * game.quantity, 0))}</h3>
        <button className="btn btn-success mt-2">Ir a pagar</button>
      </div>
    </div>
  );
};

export default Carrito;
