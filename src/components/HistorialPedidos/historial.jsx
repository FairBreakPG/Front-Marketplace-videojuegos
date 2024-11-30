import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../config/apiconfig';
import '../HistorialPedidos/styleHistorial.css';


const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);  

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      try {
       
        const response = await axios.get(`${ENDPOINT.listarHistorial}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  
          },
        });
        setPedidos(response.data);  
      } catch (error) {
        console.error('Error al obtener el historial de pedidos:', error);
      }
    };

    fetchHistorialPedidos();
  }, []); 

 
  if (pedidos.length === 0) return <div>No hay historial de pedidos</div>;

  return (
    <div>
      <h2>Historial de Pedidos</h2>
      <table>
        <thead>
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
              <td>{new Date(pedido.fecha).toLocaleString()}</td>  
              <td>{pedido.total}</td>
              <td>{pedido.estado === '1' ? 'Completado' : 'Pendiente'}</td>  
              <td>{pedido.metodo_pago}</td>
              <td>{pedido.estado_historial}</td>
              <td>{new Date(pedido.fecha_cambio).toLocaleString()}</td>  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPedidos;
