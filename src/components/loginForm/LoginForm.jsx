import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, contrasena });
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div>
                <h2>Login</h2>
                <label>Email</label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                    type='password'
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
            </div>
            <button type='submit'>Entrar</button>
        </form>
    );
};

export default LoginForm;