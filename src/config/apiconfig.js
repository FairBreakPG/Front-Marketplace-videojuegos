export const URLBASE = 'http://localhost:3000'; 

export const URLBASEPROD = 'https://back-marketplace-videojuegos.onrender.com';

export const ENDPOINT = {
  login: `${URLBASEPROD}/login`,
  usuarios: `${URLBASEPROD}/usuarios`,
  perfilusuario: (id) => `${URLBASE}/usuarios/${id}`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  carro: `${URLBASE}/carro`,
  quitarItemcarro: (id) => `${URLBASE}/carro/${id}`,
};
