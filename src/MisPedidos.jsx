import React, { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../../context/ProductoProvider";
import { getPedidos } from "../../services/api";  
import styles from './misPedidos.css'; 
import { toast } from 'react-toastify';

const MisPedidos = () => {
  const { cart, setCart } = useContext(ProductosContext);
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('El ID de usuario no está disponible');
        }

        const response = await getPedidos(userId);
        console.log('Pedidos:', response);

        if (Array.isArray(response)) {
          setPedidos(response);
        } else {
          setPedidos([]);
        }
      } catch (err) {
        console.error("Error al obtener los pedidos:", err);
        setError("Hubo un problema al obtener los pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="mis-pedidos-container">
      <h1 className="mis-pedidos-title">Mis Pedidos</h1>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="mis-pedidos-content">
        {pedidos.length === 0 ? (
          <p className="empty-cart-message">No tienes pedidos aún.</p>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <h2>Pedido #{pedido.id}</h2>
              <p>Estado: {pedido.estado === '0' ? 'Pendiente' : 'Completado'}</p>
              <p>Total: ${pedido.total.toFixed(2)}</p>
              <h3>Detalles:</h3>
              <ul>
                {pedido.detalles.map((detalle) => (
                  <li key={detalle.producto_id}>
                    {detalle.nombre} - {detalle.cantidad} x ${detalle.precio}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MisPedidos;
