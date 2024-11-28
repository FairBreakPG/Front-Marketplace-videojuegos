import React, { useContext } from 'react';
import { ProductosContext } from "../../context/ProductoProvider";
import 'react-toastify/dist/ReactToastify.css';
import './styleCarro.css';

const Carro = () => {
  const { cart, removeFromCart, calculateTotal, loading, error } = useContext(ProductosContext);

  return (
    <div className="cart-content">
  {cart.length === 0 ? (
    <p className="empty-cart-message">Tu carrito está vacío.</p>
  ) : (
    <>
      <ul className="cart-list">
        {cart.map((product) => (
          <li key={product.id} className="cart-item">
            <div className="cart-item-details">
              <img 
                src={product.img || 'default-image.jpg'}  
                alt={product.name}
                className="cart-item-image"
              />
              <span className="cart-item-name">{product.name}</span>
              <span className="cart-item-price">${product.price}</span>
              <div className="cart-item-quantity">
                <span>{product.cantidad}</span>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total: ${calculateTotal().toFixed(0)}</h3>
      </div>
    </>
  )}
</div>
  );
};

export default Carro;
