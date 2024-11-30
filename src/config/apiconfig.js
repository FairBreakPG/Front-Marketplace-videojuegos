
export const URLBASE = import.meta.env.VITE_URL;

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  carro: `${URLBASE}/carro`,
  pedidos: `${URLBASE}/pedidos`,
  obtenerPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`, 
  actualizarPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`,
  obtenerPedidosUsuario: (usuarioId) => `${URLBASE}/pedidos/usuario/${usuarioId}`,  
  obtenerPedidosGenerales: `${URLBASE}/pedidosgenerales`,
  eliminarProductoCarrito: (carritoId) => `${URLBASE}/eliminarProductoCarrito/${carritoId}`,
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
