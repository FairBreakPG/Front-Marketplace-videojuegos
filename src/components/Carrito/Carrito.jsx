import React, { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../../context/ProductoProvider"; // Importa el contexto
import { getCarro, quitarItemCarro } from "../../services/api";  
import styles from '../Carrito/carrito.css';
import { toast } from 'react-toastify';  // Para mostrar mensajes de éxito o error

const Carro = () => {
  const { cart, setCart } = useContext(ProductosContext); // Usamos el contexto
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
        // Verificar que response.items sea un array antes de establecer el estado
        if (Array.isArray(response.items)) {
          setCart(response.items); // Establece el carrito usando el setCart desde el contexto
        } else {
          setCart([]); // Si response.items no es un array, establecemos un array vacío
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
        const quantity = parseInt(item.quantity, 10) || 0;  
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
                    <img src={product.img ? `http://localhost:3000/images/${product.img}` : 'default-image.jpg'} alt={product.name} className="cart-item-image" />
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
