import React, { useState, useEffect, useContext } from 'react';
import { ProductosContext } from '../../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styleCarro.css';
import axios from 'axios';
import { ENDPOINT } from '../../config/apiconfig'; 

const Carro = () => {
  const { productos } = useContext(ProductosContext);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    obtenerCarrito();
  }, []);  

  const obtenerCarrito = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      toast.error('Token o UserId no encontrados');
      setLoading(false);
      return;
    }

    try {
      const url = ENDPOINT.obtenercarro(userId);  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarrito(response.data.items || []);
    } catch (error) {
      toast.error('Error al obtener el carrito');
    } finally {
      setLoading(false);
    }
  };

  const eliminarProductoDelCarrito = async (productoId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token no encontrado');
      return;
    }

    try {
      const url = ENDPOINT.eliminarProductoCarrito(productoId);  
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarrito(carrito.filter((item) => item.producto_id !== productoId));
      toast.success('Producto eliminado');
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => {
      const precio = parseFloat(producto.price) || 0;
      const cantidad = parseInt(producto.cantidad, 10) || 0;
      return total + (precio * cantidad);
    }, 0);
  };

  const handleRealizarPedido = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId || !metodoPago || carrito.length === 0) {
      toast.error('Por favor, complete todos los campos.');
      return;
    }

    try {
      const detalles_pedido = carrito.map((producto) => ({
        producto_id: producto.id,
        cantidad: producto.cantidad,
        precio: producto.price,
      }));

      const totalCarrito = calcularTotalCarrito();

      const url = ENDPOINT.pedidos; 
      const response = await axios.post(
        url,
        {
          usuario_id: userId,
          total: totalCarrito,
          metodo_pago: metodoPago,
          detalles_pedido,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Pedido realizado con éxito');
      } else {
        toast.error('Error al realizar el pedido');
      }
    } catch (error) {
      toast.error('Error al realizar el pedido');
    }
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
            <li key={producto.producto_id} className="product-item">
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
                  onClick={() => eliminarProductoDelCarrito(producto.producto_id)}
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

      <div className="payment-method">
        <h4>Selecciona tu método de pago</h4>
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="">Seleccione</option>
          <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
          <option value="PayPal">PayPal</option>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>

      <button
        onClick={handleRealizarPedido}
        disabled={!metodoPago || carrito.length === 0}
        className="btn btn-primary"
      >
        Realizar Pedido
      </button>

      <ToastContainer />
    </div>
  );
};

export default Carro;
