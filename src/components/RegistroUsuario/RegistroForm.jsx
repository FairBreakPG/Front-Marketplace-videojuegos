import { useState } from 'react';
import axios from 'axios'; 
import { ENDPOINT } from '../../config/apiconfig'; 
import styles from './RegistroForm.module.css';

const RegistroForm = ({ onSubmit }) => {
  const [formularioDatos, setFormularioDatos] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    telefono: '',
    direccion: '',
    rol: 'usuario', 
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false); 
  const [mensajeExito, setMensajeExito] = useState(''); 

  const manejarCambio = (e) => {
    const { name, value } = e.target; 
    setFormularioDatos({
      ...formularioDatos,
      [name]: value, 
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault(); 
    setCargando(true); 
    setError('');
    setMensajeExito('');

    try {
      const respuesta = await axios.post(ENDPOINT.usuarios, formularioDatos);
      console.log('Usuario registrado:', respuesta.data);
      onSubmit(respuesta.data);
      setMensajeExito('Usuario registrado correctamente');
      setFormularioDatos({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',  
        telefono: '',
        direccion: '',
        rol: 'usuario', 
      });
    } catch (error) {
      console.error(error);
      setError('Hubo un error al registrar el usuario.');
    } finally {
      setCargando(false); 
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          id="nombre" 
          name="nombre" 
          value={formularioDatos.nombre} 
          onChange={manejarCambio} 
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rol">Rol</label>
        <select 
          id="rol" 
          name="rol" 
          value={formularioDatos.rol} 
          onChange={manejarCambio} 
          required
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input 
          type="text" 
          id="apellido" 
          name="apellido" 
          value={formularioDatos.apellido} 
          onChange={manejarCambio} 
          required
        />
      </div>
      <button type="submit" disabled={cargando}>
        {cargando ? 'Registrando...' : 'Registrar'}
      </button>
      {error && <div className="error">{error}</div>}
      {mensajeExito && <div className="exito">{mensajeExito}</div>}
    </form>
  );
};

export default RegistroForm;
