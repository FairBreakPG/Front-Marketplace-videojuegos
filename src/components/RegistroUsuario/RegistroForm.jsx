import { useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={manejarEnvio}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h2 className="mb-4 text-center">Registro de Usuario</h2>

        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formularioDatos.nombre}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formularioDatos.apellido}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formularioDatos.email}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formularioDatos.contraseña}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formularioDatos.telefono}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formularioDatos.direccion}
            onChange={manejarCambio}
            className="form-control"
            required
          />
        </div>

        <button type="submit" disabled={cargando} className="btn btn-primary w-100">
          {cargando ? 'Registrando...' : 'Registrar'}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {mensajeExito && <div className="alert alert-success mt-3">{mensajeExito}</div>}
      </form>
    </div>
  );
};

export default RegistroForm;
