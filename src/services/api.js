import axios from 'axios';
import { ENDPOINT } from '../config/apiconfig'; 


export const login = async (credentials) => {
  try {
    const response = await axios.post(ENDPOINT.login, credentials);
    return response.data; 
  } catch (error) {
    console.error('Error en login:', error);
    throw error; 
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

export const getCarro = async () => {
  try {
    const response = await axios.get(ENDPOINT.carro);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

export const quitarItemCarro = async (id) => {
  try {
    const response = await axios.delete(ENDPOINT.quitarItemcarro(id));
    return response.data;
  } catch (error) {
    console.error('Error al quitar ítem del carrito:', error);
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
