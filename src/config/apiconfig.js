
export const URLBASE = import.meta.env.VITE_URL;

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  carro: `${URLBASE}/carro`,
  quitarItemcarro: (id) => `${URLBASE}/carro/${id}`,
  pedidos: `${URLBASE}/pedidos`,
  obtenerPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`, 
  actualizarPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`,
  listarHistorial: `${URLBASE}/listarHistorialUsuario`,
  eliminarProductoCarro: (usuarioId, productoId) => `${URLBASE}/carrito/${usuarioId}/${productoId}`,
};


/*
export const URLBASE = 'http://localhost:3000'; 
export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  perfilusuario: (id) => `${URLBASE}/usuarios/${id}`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  carro: `${URLBASE}/carro`,
  quitarItemcarro: (id) => `${URLBASE}/carro/${id}`,
};
*/
