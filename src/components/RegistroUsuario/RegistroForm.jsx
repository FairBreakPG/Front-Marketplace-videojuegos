import { useState } from 'react';
import axios from 'axios'; 
import { ENDPOINT } from '../../config/apiconfig'; 
import styles from './RegistroForm.module.css';
import { URLBASE } from '../config/apiconfig'; 


const RegistroForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    rol: 'usuario', 
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Datos del formulario:', formData); 
    
    try {
      const response = await axios.post(ENDPOINT.usuarios, formData);
      console.log('Usuario registrado:', response.data);
      onSubmit(response.data);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',  
        telefono: '',
        direccion: '',
        rol: 'usuario', 
      });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Hubo un error al registrar al usuario. Intenta de nuevo.');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="contrasena">Contraseña</label>
        <input
        type="password"
        id="contraseña" 
        name="contraseña" 
        value={formData.contraseña} 
        onChange={handleChange}
        required
/>

      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="usuario">cliente</option>
          <option value="admin">admin</option>
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};

export default RegistroForm;
