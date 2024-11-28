import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLBASE } from '../config/apiconfig'; 

const PerfilUsuario = ({ userId, token }) => {
  const [perfil, setPerfil] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(URLBASE +`/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPerfil(response.data.perfil);
        setPedidos(response.data.pedidos);
        setForm(response.data.perfil);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchPerfil();
  }, [userId, token]);

  const handleUpdate = async () => {
    try {
      await axios.put(URLBASE+`/usuario/${userId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerfil(form);
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  if (!perfil) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Perfil de {perfil.nombre} {perfil.apellido}</h1>
      <p>Rol: {perfil.rol}</p>
      {perfil.rol === 'admin' && <p>Acceso completo al sistema.</p>}
      {editMode ? (
        <form>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            type="text"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          />
          <button type="button" onClick={handleUpdate}>Guardar</button>
        </form>
      ) : (
        <>
          <p>Email: {perfil.email}</p>
          <p>Teléfono: {perfil.telefono}</p>
          <p>Dirección: {perfil.direccion}</p>
          <button onClick={() => setEditMode(true)}>Editar</button>
        </>
      )}
      {perfil.rol === 'cliente' && (
        <>
          <h2>Tus pedidos</h2>
          <ul>
            {pedidos.map((pedido) => (
              <li key={pedido.pedido_id}>
                Pedido #{pedido.pedido_id} - Total: ${pedido.total} - Estado: {pedido.estado === '1' ? 'Completado' : 'Pendiente'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
