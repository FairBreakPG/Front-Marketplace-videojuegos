import React, { useState, useEffect } from "react";
import { getCarro, agregarAlCarro, quitarItemCarro } from "../../services/api";  
import styles from '../Carrito/carrito.css';

const Carro = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('El ID de usuario no está disponible');
        }
  
        const response = await getCarro(userId);
        setCart(response.items);
      } catch (err) {
        console.error("Error al obtener el carrito:", err);
        setError("Hubo un problema al obtener el carrito");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      await quitarItemCarro(productId, token);

      const updatedCart = await getCarro();
      setCart(updatedCart.items);
      toast.success("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto del carrito");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
  
      if (isNaN(price) || isNaN(quantity)) {
        console.warn(`Producto con ID ${item.id} tiene datos inválidos.`);
        return total;
      }
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="cart-content">
        {cart.length === 0 ? (
          <p className="empty-cart-message">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-list">
              
              {cart.map((product) => (
                
                <li key={product.id} className="cart-item">
                  <div className="cart-item-details">
                    <img src={product.img} alt={product.name} className="cart-item-image" />
                    <span className="cart-item-name">{product.name}</span>
                    <span className="cart-item-price">${product.price}</span>
                    <span className="cart-item-quantity">x {product.quantity}</span>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
              <button className="checkout-btn">Proceder al pago</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carro;
