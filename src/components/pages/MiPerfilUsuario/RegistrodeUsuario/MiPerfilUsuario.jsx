import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import styles from './MiPerfilUsuario.module.css'; // Actualiza la importación del CSS
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const MiPerfilUsuario = () => {
    const navigate = useNavigate(); // Crear la instancia de useNavigate

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };
    return (
        <>
            {/* Inicio del Header */}
            <Header />
            {/* Fin del Header */}

            <main
                style={{
                    padding: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        width: '80%',
                        justifyContent: 'center',
                    }}
                >
                    {/* Container Cuenta */}
                    <div
                        style={{
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '20px',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }}>Cuenta</h2>
                        <form>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Nombre</label>
                                <input
                                    type='text'
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Dirección</label>
                                <input
                                    type='text'
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Teléfono</label>
                                <input
                                    type='text'
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label>Contraseña</label>
                                <input
                                    type='password'
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                    }}
                                />
                            </div>
                            <button
                                type='submit'
                                style={{
                                    width: '30%',
                                    padding: '10px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                            >
                                Modificar o agregar
                            </button>
                            <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
                        </form>
                    </div>

                    {/* Container Historial de Pedidos */}
                    <div
                        style={{
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '20px',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }}>
                            Historial de pedidos
                        </h2>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '100px 1fr 100px',
                                gap: '10px',
                            }}
                        >
                            {[1, 2, 3].map((_, index) => (
                                <React.Fragment key={index}>
                                    <img
                                        src='/placeholder.svg'
                                        alt='Producto'
                                        style={{ width: '100%' }}
                                    />
                                    <p style={{ textAlign: 'center' }}>
                                        Descripción del producto
                                    </p>
                                    <p>$99.999</p>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Inicio del Footer */}
            <Footer />
            {/* Fin del Footer */}
        </>
    )
}

export default MiPerfilUsuario