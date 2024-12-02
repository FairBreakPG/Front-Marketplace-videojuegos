import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const token = localStorage.getItem('token');

  if (!token) {
    console.error("Token no encontrado");
    return <div>Error: No se encontró el token de autenticación.</div>;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(ENDPOINT.obtenerPerfilUsuario(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUsuario(data);
        setFormData({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          direccion: data.direccion,
          telefono: data.telefono,
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(ENDPOINT.actualizarPerfilUsuario(), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Usuario actualizado:', response.data);
      setUsuario(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Perfil de Usuario</h2>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="d-flex justify-content-between">
            {isEditing ? (
              <>
                <button className="btn btn-success" onClick={handleSaveChanges}>Guardar Cambios</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            ) : (
              <button className="btn btn-warning" onClick={handleEditClick}>Editar Perfil</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
