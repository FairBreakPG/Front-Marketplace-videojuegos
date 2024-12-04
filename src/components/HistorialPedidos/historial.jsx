import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';  

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No se encontró el token de autenticación.');
        return;
      }

      try {
        const response = await axios.get(ENDPOINT.obtenerPedidosUsuario(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);  
      } catch (error) {
        console.error('Error al obtener el historial de pedidos:', error);
        setError('Hubo un error al obtener los pedidos.');
      }
    };

    fetchHistorialPedidos();
  }, []); 

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (pedidos.length === 0) return <div className="alert alert-info">No hay historial de pedidos.</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Historial de Pedidos</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Pedido ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Met. Pago</th>
              <th>Estado Historial</th>
              <th>Fecha Cambio</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>{pedido.pedido_id}</td>
                <td>{new Date(pedido.fecha_pedido).toLocaleString()}</td>
                <td>{pedido.total}</td>
                <td>{pedido.estado === '1' ? 'Completado' : 'Pendiente'}</td>
                <td>{pedido.metodo_pago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialPedidos;
