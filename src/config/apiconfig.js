
//export const URLBASE = import.meta.env.VITE_API_URL;
export const URLBASE = import.meta.env.VITE_URL;


export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  perfilusuario: (id) => `${URLBASE}/usuarios/${id}`,
  productos: `${URLBASE}/productos`, 
  crearProducto: `${URLBASE}/productos`, 
  carro: `${URLBASE}/carro`,
  quitarItemcarro: (id) => `${URLBASE}/carro/${id}`,
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
