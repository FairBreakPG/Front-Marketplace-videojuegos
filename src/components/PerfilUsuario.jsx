import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLBASE } from '../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';  

const PerfilUsuario = ({ userId, token }) => {
  const [perfil, setPerfil] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(URLBASE + `/usuario/${userId}`, {
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
      await axios.put(URLBASE + `/usuario/${userId}`, form, {
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
    <div className="container mt-4">
      <h1>Perfil de {perfil.nombre} {perfil.apellido}</h1>
      <p><strong>Rol:</strong> {perfil.rol}</p>
      {perfil.rol === 'admin' && <p>Acceso completo al sistema.</p>}

      {editMode ? (
        <div>
          <h3>Editar Perfil</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar</button>
          </form>
        </div>
      ) : (
        <div>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          <p><strong>Dirección:</strong> {perfil.direccion}</p>
          <button className="btn btn-warning" onClick={() => setEditMode(true)}>Editar</button>
        </div>
      )}

      {perfil.rol === 'cliente' && (
        <>
          <h2 className="mt-4">Tus pedidos</h2>
          <ul className="list-group">
            {pedidos.map((pedido) => (
              <li className="list-group-item" key={pedido.pedido_id}>
                <strong>Pedido #{pedido.pedido_id}</strong> - Total: ${pedido.total} - Estado: {pedido.estado === '1' ? 'Completado' : 'Pendiente'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
