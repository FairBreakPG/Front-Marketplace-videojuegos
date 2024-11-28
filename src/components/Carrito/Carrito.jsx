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

  const agregarProductoAlCarro = async (producto) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. El usuario no está autenticado.');
      }

      const response = await axios.post(
        ENDPOINT.carro,
        { productoId: producto.id, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setCarrito(response.data.items || []); 
      toast.success(`${producto.nombre} agregado al carrito`);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      toast.error('No se pudo agregar el producto al carrito');
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
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
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
                <span className="product-item-name">{producto.nombre}</span>
                <span className="product-item-price">${producto.precio}</span>
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
