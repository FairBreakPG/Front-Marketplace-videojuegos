
export const URLBASE = import.meta.env.VITE_URL;

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  obtenercarro: (userId) => `${URLBASE}/obtenercarroporusuario/${userId}`,
  pedidos: `${URLBASE}/pedidos`,
  carro: `${URLBASE}/carro`,
  obtenerPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`, 
  actualizarPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`,
  obtenerPedidosUsuario: (usuarioId) => `${URLBASE}/pedidos/usuario/${usuarioId}`,  
  obtenerPedidosGenerales: `${URLBASE}/pedidosgenerales`,
  eliminarProductoCarrito: (userId, productoId) => `${URLBASE}/eliminarProductoCarrito/${userId}/${productoId}`,
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
