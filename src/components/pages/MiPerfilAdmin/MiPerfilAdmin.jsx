import 'react'
import './MiPerfilAdmin.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const MiPerfilAdmin = () => {
    console.log("Renderizando Admin");
    return (
        <>
            {/* Inicio del Header */}
            <Header />
            {/* Fin del Header */}

            <main
                style={{
                    padding: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '80%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>
                        Gestión de Productos
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 2fr 100px 150px',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        {/* Producto */}
                        <div>
                            <img
                                src='/placeholder.svg'
                                alt='Producto'
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <input
                                type='text'
                                placeholder='Descripción del producto'
                                style={{
                                    width: '100%',
                                    padding: '2px',
                                    marginBottom: '10px',
                                }}
                            />
                        </div>

                        {/* Precio */}
                        <div>
                            <input
                                type='number'
                                placeholder='Precio'
                                style={{
                                    width: '100%',
                                    padding: '2px',
                                    marginBottom: '10px',
                                }}
                            />
                        </div>

                        {/* Cantidad */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <input
                                type='number'
                                defaultValue={1}
                                style={{
                                    width: '50px',
                                    textAlign: 'center',
                                    padding: '2px',
                                    marginBottom: '10px',
                                }}
                            />
                        </div>

                        {/* Botones de Acción */}
                        <div
                            style={{
                                gridColumn: 'span 4',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <button
                                style={{
                                    padding: '10px 20px',
                                    marginRight: '10px',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                            >
                                Subir Producto
                            </button>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                            >
                                Borrar Producto
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Fin de la nueva sección main */}

            {/* Inicio del Footer */}
            <Footer />
            {/* Fin del Footer */}
        </>
    )
}

export default MiPerfilAdmin