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
  const [metodoPago, setMetodoPago] = useState('');
  const [total, setTotal] = useState(0);

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

  const eliminarProductoDelCarrito = async (productoId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      toast.error('Usuario no autenticado');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. El usuario no está autenticado.');
      }
      await axios.delete(ENDPOINT.eliminarProductoCarrito(productoId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarrito(carrito.filter((item) => item.producto_id !== productoId));
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

  const formatoTotal = (total) => {
    return total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);
  };

  const handleRealizarPedido = async () => {
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
      const response = await axios.post(
        `${ENDPOINT.pedidos}`,
        {
          usuario_id: userId,
          total: totalCarrito,
          metodo_pago: metodoPago,
          detalles_pedido,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success('Pedido realizado con éxito');
      } else {
        toast.error('Error al realizar el pedido');
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      toast.error('Hubo un error al realizar el pedido');
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
        <h3>Total: ${formatoTotal(calcularTotalCarrito())}</h3>
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
