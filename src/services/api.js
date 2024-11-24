import axios from 'axios';
import { ENDPOINT } from '../config/apiconfig'; 


export const login = async ({ email, contrasena }) => {
  try {
    const response = await axios.post('http://localhost:3000/login', { email, contraseña: contrasena });
    
    localStorage.setItem('token', response.data.token);   
    localStorage.setItem('userId', response.data.userId); 
    return response.data; 
  } catch (error) {
    throw new Error('Error al hacer login');
  }
};


export const getUsuarios = async () => {
  try {
    const response = await axios.get(ENDPOINT.usuarios);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};


export const getPerfilUsuario = async (id) => {
  try {
    const response = await axios.get(ENDPOINT.perfilusuario(id));
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    throw error;
  }
};


export const getOrdenes = async () => {
  try {
    const response = await axios.get(ENDPOINT.ordenes);
    return response.data;
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};


export const getOrdenesHistorial = async () => {
  try {
    const response = await axios.get(ENDPOINT.ordenesHistorial);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de órdenes:', error);
    throw error;
  }
};


export const getProductos = async () => {
  try {
    const response = await axios.get(ENDPOINT.productos);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};


export const crearProducto = async (productoData) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }


    const response = await axios.post(ENDPOINT.crearProducto, productoData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};


const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');  

  if (!refreshToken) {
    throw new Error('No se encontró refresh token');
  }

  const response = await axios.post('http://localhost:3000/refresh-token', { refreshToken });
  localStorage.setItem('token', response.data.token);  
  return response.data.token;
};


export const getCarro = async (userId) => {
  try {
    const token = localStorage.getItem('token');  
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const response = await axios.get(`${ENDPOINT.carro}/${userId}`, { 
      headers: {
        'Authorization': `Bearer ${token}`  
      }
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const newToken = await refreshToken();
    
      const response = await axios.get(`${ENDPOINT.carro}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${newToken}`
        }
      });

      return response.data;
    }
    
    throw new Error(error.response?.data?.message || "Error al obtener el carrito");
  }
};

export const agregarAlCarro = async (productoId, cantidad) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }
    console.log('Enviando solicitud al backend', { productoId, cantidad, token });
    const response = await axios.post(ENDPOINT.carro, 
      { productoId, cantidad }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      });

    console.log('Respuesta del backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud al backend:', error);
    throw new Error(error.response?.data?.message || "Error al agregar producto al carrito");
  }
};

export const quitarItemCarro = async (productoId) => {
  try {
    const token = localStorage.getItem('token');  
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const response = await axios.delete(ENDPOINT.quitarItemcarro(productoId), {
      headers: {
        'Authorization': `Bearer ${token}`  
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al quitar producto del carrito");
  }
};






