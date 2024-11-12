
export const URLBASE = 'http://localhost:3000'; 

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  usuarios: `${URLBASE}/usuarios`,
  perfilusuario: (id) => `${URLBASE}/usuarios/${id}`,
  carro: `${URLBASE}/carrito`,
  quitarItemcarro: (id) => `${URLBASE}/carrito/${id}`,
  ordenes: `${URLBASE}/pedidos`,
  ordenesHistorial: `${URLBASE}/pedidos`,
};
