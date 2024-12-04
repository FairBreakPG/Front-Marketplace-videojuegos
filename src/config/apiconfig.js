
export const URLBASE = import.meta.env.VITE_URL;

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  obtenercarro: () => `${URLBASE}/obtenercarro`, 
  pedidos: `${URLBASE}/pedidos`,
  carro: `${URLBASE}/carro`,
  obtenerPerfilUsuario: () => `${URLBASE}/perfilusuario`,
  actualizarUsuario: () => `${URLBASE}/actualizar-perfil`, 
  obtenerPedidosUsuario: () => `${URLBASE}/pedidos/usuario`,
  obtenerPedidosGenerales: `${URLBASE}/pedidosgenerales`,
  eliminarProductoCarrito: (productoId) => `${URLBASE}/eliminarProductoCarrito/${productoId}`,
};

