import React, { useState, useEffect } from 'react'; 
import axios from 'axios';  
import { ENDPOINT } from '../../../config/apiconfig';
import './stylePerfil.css';

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

  const userId = localStorage.getItem('userId'); 

  if (!userId || isNaN(userId)) {
    console.error('ID de usuario no válido');
    return <div>Error: No se encontró el ID del usuario.</div>;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(ENDPOINT.obtenerPerfilUsuario(userId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  
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
  }, [userId]);

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
      const response = await axios.put(ENDPOINT.actualizarPerfilUsuario(userId), formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          disabled={!isEditing}  
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        {isEditing ? (
          <button onClick={handleSaveChanges}>Guardar Cambios</button>  
        ) : (
          <button onClick={handleEditClick}>Editar</button>  
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;