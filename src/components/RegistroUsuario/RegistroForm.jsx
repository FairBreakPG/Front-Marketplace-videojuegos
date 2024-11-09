import { useState } from 'react'

const RegistroForm = ({ onSubmit }) => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const usuario = {
            nombre,
            apellido,
            email,
            contrasena,
            direccion,
            telefono,
            rol: 'usuario',
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_USUARIO_URL}/register`, { // Usa la variable de entorno
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!response.ok) {
                throw new Error('Error en el registro')
            }

            const data = await response.json()
            onSubmit(data)
        } catch (error) {
            console.error('Error en el registro:', error.message)
        }

        setNombre('')
        setApellido('')
        setEmail('')
        setContrasena('')
        setDireccion('')
        setTelefono('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label>Apellido</label>
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
            </div>
            <div>
                <label>Dirección</label>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
            </div>
            <div>
                <label>Teléfono</label>
                <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    )
}

export default RegistroForm