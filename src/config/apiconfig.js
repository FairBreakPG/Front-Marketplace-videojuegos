
export const URLBASE = import.meta.env.VITE_URL;

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  //obtenercarro: (userId) => `${URLBASE}/obtenercarroporusuario/${userId}`,
  obtenercarro: () => `${URLBASE}/obtenercarro`, 
  pedidos: `${URLBASE}/pedidos`,
  carro: `${URLBASE}/carro`,
  //obtenerPerfilUsuario: (id) => `${URLBASE}/perfilusuario/${id}`, 
  obtenerPerfilUsuario: () => `${URLBASE}/perfilusuario`,
  //actualizarUsuario: (id) => `${URLBASE}/actualizar-perfil/${id}`,
  actualizarUsuario: () => `${URLBASE}/actualizar-perfil`, 
  //obtenerPedidosUsuario: (usuarioId) => `${URLBASE}/pedidos/usuario/${usuarioId}`,  
  obtenerPedidosUsuario: () => `${URLBASE}/pedidos/usuario`,
  obtenerPedidosGenerales: `${URLBASE}/pedidosgenerales`,
  eliminarProductoCarrito: (productoId) => `${URLBASE}/eliminarProductoCarrito/${productoId}`,
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
