import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import RegistroForm from '../../components/RegistroUsuario/RegistroForm';
import Mensaje from '../../components/RegistroUsuario/Mensaje';
import styles from './RegistroUsuario.module.css';

const RegistroUsuario = () => {
  const [mensaje, setMensaje] = useState('');

  const handleRegistro = (usuario) => {
    console.log('Usuario registrado:', usuario);
    setMensaje('Registro exitoso');
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <h3>Registro de Usuario</h3>
          <RegistroForm onSubmit={handleRegistro} />
          <Mensaje mensaje={mensaje} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistroUsuario;
