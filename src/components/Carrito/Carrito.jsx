import React, { useState, useEffect, useContext } from 'react';
import { ProductosContext } from '../../context/ProductoProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ENDPOINT } from '../../config/apiconfig'; 

const Carro = () => {
  const { productos } = useContext(ProductosContext); 
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');

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
      //const url = ENDPOINT.obtenercarro(userId);  
      const url = ENDPOINT.obtenercarro();
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarrito(response.data.items || []);
      console.log("Respuesta del carrito:", response.data);
    } catch (error) {
      toast.error('Error al obtener el carrito');
    } finally {
      setLoading(false);
    }
  };

  const eliminarProductoDelCarrito = async (productoId) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('ProductoId:', productoId);
  
    if (!token || !productoId) {
      toast.error('Token o ID de producto no encontrados');
      return;
    }
  
    try {
      const productoAEliminar = carrito.find((producto) => producto.producto_id === productoId);
  
      if (!productoAEliminar) {
        toast.error('Producto no encontrado en el contexto');
        return;
      }
  
      const url = ENDPOINT.eliminarProductoCarrito(productoId); 
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.producto_id !== productoId));
  
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      toast.error('Error al eliminar el producto del carrito');
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };
  

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => {
      const precio = parseFloat(producto.price) || 0;
      const cantidad = parseInt(producto.cantidad, 10) || 0;
      return total + (precio * cantidad);
    }, 0);
  };

  const realizarPedido = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

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
          //usuario_id: userId,
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
    <div className="container mt-4">
      <h2 className="mb-4">Productos en el Carrito</h2>
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : carrito.length === 0 ? (
        <div className="alert alert-warning text-center">Tu carrito está vacío.</div>
      ) : (
        <ul className="list-group">
          {carrito.map((producto) => (
            <li key={producto.producto_id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={producto.img || 'default-image.jpg'}
                  alt={producto.nombre}
                  className="img-thumbnail"
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="ms-3">
                  <span className="fw-bold">{producto.name}</span><br />
                  <span>Precio: ${producto.price}</span><br />
                  <span>Cantidad: {producto.cantidad}</span>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => eliminarProductoDelCarrito(producto.id)} 
                >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
      <h3>Total: ${parseInt(calcularTotalCarrito(), 10)}</h3>
      </div>

      <div className="mt-3">
        <h4>Selecciona tu método de pago</h4>
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          className="form-select"
        >
          <option value="">Seleccione</option>
          <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
          <option value="PayPal">PayPal</option>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          onClick={realizarPedido}
          disabled={!metodoPago || carrito.length === 0}
          className="btn btn-primary w-100"
        >
          Realizar Pedido
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Carro;
