import React, { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../../context/ProductoProvider";
import { getCarro, quitarItemCarro } from "../../services/api";  
import styles from '../Carrito/carrito.css';
import { toast } from 'react-toastify';

const Carro = () => {
  const { cart, setCart } = useContext(ProductosContext); 
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
        console.log('Respuesta del API:', response);

        if (response && Array.isArray(response.items)) {
          setCart(response.items);
        } else {
          setCart([]);
        }
      } catch (err) {
        console.error("Error al obtener el carrito:", err);
        setError("Hubo un problema al obtener el carrito");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCart]);  

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const handleRemoveFromCart = async (productId) => {
    if (loading) return;

    try {
      setLoading(true);
      const token = getAuthToken();
      const userId = localStorage.getItem('userId');

      if (!userId) {
        throw new Error('El ID de usuario no está disponible');
      }

      await quitarItemCarro(productId, token, userId);  
      const updatedCart = await getCarro(userId);  
      if (Array.isArray(updatedCart.items)) {
        setCart(updatedCart.items);  
      } else {
        setCart([]);
      }

      toast.success("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto del carrito");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (Array.isArray(cart)) {
      return cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;  
        const quantity = parseInt(item.cantidad, 10) || 0;  
        return total + (price * quantity);
      }, 0);
    }
    return 0;
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="cart-content">
        {Array.isArray(cart) && cart.length === 0 ? (
          <p className="empty-cart-message">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-list">
              {Array.isArray(cart) && cart.map((product) => (
                <li key={product.id} className="cart-item">
                  <div className="cart-item-details">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="cart-item-image" 
                      onError={(e) => e.target.src = 'default-image.jpg'}  
                    />
                    <span className="cart-item-name">{product.name}</span>
                    <span className="cart-item-price">${product.price}</span>

                    <div className="cart-item-quantity">
                      <span>{product.cantidad}</span> 
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${calculateTotal().toFixed(0)}</h3>
              <button className="checkout-btn">Realizar pedido</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carro;
