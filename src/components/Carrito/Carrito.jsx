import React, { useState, useEffect, useContext } from 'react';
import { ProductosContext } from "../../context/ProductoProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styleCarro.css';
import { agregarAlCarro, getCarro, eliminarProductoDelCarrito } from '../../services/api';

const Carro = () => {
  const { productos } = useContext(ProductosContext);
  const [carrito, setCarrito] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const obtenerCarrito = async () => {
    setLoading(true);
    try {
      const carritoData = await getCarro();
      setCarrito(carritoData.items || []); 
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setError("Hubo un problema al obtener el carrito");
      toast.error("Error al obtener el carrito");
    } finally {
      setLoading(false);
    }
  };

  const agregarProductoAlCarro = async (producto) => {
    const cantidad = 1; 
    try {
      const respuesta = await agregarAlCarro(producto.id, cantidad);
      setCarrito(respuesta.items || []);  // Actualizar carrito
      toast.success(`${producto.nombre} agregado al carrito`);
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      toast.error('No se pudo agregar el producto al carrito');
    }
  };

  const eliminarProductoDelCarritoHandler = async (productoId) => {
    try {
      await eliminarProductoDelCarrito(productoId);
      setCarrito(carrito.filter(item => item.id !== productoId)); 
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      toast.error('No se pudo eliminar el producto del carrito');
    }
  };

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  };

  return (
    <div className="product-content">
      <h2>Productos en el Carrito</h2>
      {carrito.length === 0 ? (
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
                  onClick={() => eliminarProductoDelCarritoHandler(producto.id)}
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
