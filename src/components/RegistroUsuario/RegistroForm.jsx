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
        <>
        

        <form className="row g-3 RegistroForm" onSubmit={handleSubmit}>
         <h2>Registro</h2>
  <div className="col-md-6">
  <label for="formGroupExampleInput" className="form-label">Nombre</label>
  <input type="text" className="form-control" id="formGroupExampleInput" value={nombre}
                    onChange={(e) => setNombre(e.target.value)}/>
  </div>

  <div className="col-md-6">
  <label for="exampleInputEmail1" className="form-label">Correo electrónico</label>
  <input type="email" className="form-control" id="exampleInputEmail1" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
  </div>

  <div className="col-md-6">
  <label for="formGroupExampleInput" className="form-label">Apellido</label>
  <input type="text" className="form-control" id="formGroupExampleInput"  value={apellido}
                    onChange={(e) => setApellido(e.target.value)}/>
  </div>

  <div className="col-md-6">
  <label for="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}/>
  </div>

  <div className="col-md-6">
  <label for="formGroupExampleInput" className="form-label">Dirección</label>
  <input type="text" className="form-control" id="formGroupExampleInput"  value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}/>
  </div>

  <div className="col-md-6">
  <label for="exampleInputPassword1" className="form-label">Confirmar contraseña</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary boton-registro">Crear Cuenta</button>

  
</form>
        </>
    )
}

export default RegistroForm