import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProductosContext } from '../../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styleCarro.css';
import { ENDPOINT } from '../../config/apiconfig';

const Carro = () => {
  const { productos } = useContext(ProductosContext);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const obtenerCarrito = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      console.log('userId:', userId, 'token:', token); 
  
      if (!token || !userId) {
        throw new Error('Token o userId no encontrado');
      }
  
      const response = await axios.get(`${ENDPOINT.carro}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCarrito(response.data.items || []);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      toast.error('Error al obtener el carrito');
    } finally {
      setLoading(false);
    }
  };

  
  const eliminarProductoDelCarrito = async (productoId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. El usuario no está autenticado.');
      }

      await axios.delete(`${ENDPOINT.carro}/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setCarrito(carrito.filter((item) => item.id !== productoId));
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      toast.error('No se pudo eliminar el producto del carrito');
    }
  };

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => {
      const precio = parseFloat(producto.price) || 0; 
      const cantidad = parseInt(producto.cantidad, 10) || 0;  
      return total + (precio * cantidad);
    }, 0);
  };
  

  return (
    <div className="product-content">
      <h2>Productos en el Carrito</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : carrito.length === 0 ? (
        <p className="empty-product-message">Tu carrito está vacío.</p>
      ) : (
        <ul className="product-list">
          {carrito.map((producto) => (
            <li key={producto.id} className="product-item">
              <div className="product-item-details">
                <img
                  src={producto.img || 'default-image.jpg'}
                  alt={producto.nombre}
                  className="product-item-image"
                />
                <span className="product-item-name">{producto.name}</span>
                <span className="product-item-price">${producto.price}</span>
                <span className="product-item-quantity">Cantidad: {producto.cantidad}</span>
                <button
                  className="remove-btn"
                  onClick={() => eliminarProductoDelCarrito(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>Total: ${calcularTotalCarrito().toFixed(2)}</h3>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Carro;
