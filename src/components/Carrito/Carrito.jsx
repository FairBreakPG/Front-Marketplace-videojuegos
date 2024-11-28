import React, { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../../context/ProductoProvider";
import { getCarro, eliminarProductoDelCarrito, guardarPedido } from "../../services/api";  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styleCarro.css';

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

        const response = await getCarro(userId); // Aquí usamos la función con axios
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

  const removeProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await eliminarProductoDelCarrito(productId); 

      if (response && response.message === 'Producto eliminado del carrito') {
        setCart(cart.filter(item => item.id !== productId));
        toast.success('Producto eliminado correctamente');
      } else {
        toast.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.error('Hubo un problema al eliminar el producto del carrito');
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

  const handleCheckout = async () => {
    const usuario_id = localStorage.getItem('userId');
    const total = calculateTotal();
    const metodo_pago = 'Tarjeta';

    if (usuario_id && total > 0) {
      const detalles_pedido = cart.map(item => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        precio: item.price,
      }));

      try {
        const response = await guardarPedido(usuario_id, total, metodo_pago, detalles_pedido); // Usamos axios para guardar el pedido
        if (response) {
          toast.success('Pedido realizado con éxito');
        } else {
          toast.error('Hubo un problema al realizar el pedido');
        }
      } catch (error) {
        toast.error('Hubo un problema al realizar el pedido');
      }
    } else {
      toast.error('Debe iniciar sesión y tener productos en el carrito');
    }
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
                  <button className="remove-btn" onClick={() => removeProduct(product.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${calculateTotal().toFixed(0)}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>Realizar pedido</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carro;
