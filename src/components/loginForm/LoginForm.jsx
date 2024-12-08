import { useState } from 'react';
import styles from './LoginForm.module.css';
import { ENDPOINT } from '../../config/apiconfig'; 
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); 
  const { login } = useAuth();

  const envio = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      console.log('Intentando hacer login con:', { email, contrasena });
      const response = await axios.post(`${ENDPOINT.login}`, {
        email,
        contraseña: contrasena
      });
      const userData = response.data;
      console.log('Respuesta del backend:', userData);
      onSubmit(userData); 
    } catch (error) {
      console.error('Error al hacer login:', error);
      setError('Correo o contraseña incorrectos'); 
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={envio}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        <div className={styles.inputGroup}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>Ingresar</button>

        <div className={styles.footer}>
          <p>No tienes cuenta? <a href="/registrar-usuario">Regístrate aquí</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
