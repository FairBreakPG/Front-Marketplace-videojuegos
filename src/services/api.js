import axios from 'axios';
import { ENDPOINT } from '../config/apiconfig'; 


export const getUsuarios = async () => {
  try {
    const response = await axios.get(ENDPOINT.usuarios);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
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

export const login = async ({ email, contrasena }) => {
  try {
    const response = await axios.post(ENDPOINT.login, { email, contraseña: contrasena });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    return response.data;
  } catch (error) {
    throw new Error('Error al hacer login');
  }
};

export const obtenerCarrito = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado');
    }
    console.log('Obteniendo carrito...');

    
    const url = `${ENDPOINT.obtenercarro}`; 
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta del carrito:', response.data);
    setCarrito(response.data.items || []);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    toast.error('Error al obtener el carrito');
  } finally {
    setLoading(false);
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
      { 
        productoId, 
        cantidad 
      }, 
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


export const guardarPedido = async (metodo_pago, carrito) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const usuarioId = localStorage.getItem('userId'); 

  const detalles_pedido = carrito.map(producto => ({
    producto_id: producto.id,
    cantidad: producto.cantidad,
    precio: producto.price,
  }));

  try {
    const response = await axios.post(
      `${ENDPOINT.pedidos}`,
      {
        //usuario_id: usuarioId, 
        total: carrito.total,  
        metodo_pago,
        detalles_pedido,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
    throw error;
  }
};


export const obtenerPerfilUsuario = async () => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }
  try {
    const response = await axios.get(ENDPOINT.obtenerPerfilUsuario(), {  
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;  
  }
}

export const actualizarUsuario = async (datos) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token no encontrado');
  }
  
  try {
    const response = await axios.put('/actualizar-perfil', datos, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    console.log('Usuario actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const eliminarProductoDelCarrito = async (productoId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Token no encontrado');
    return;
  }

  try {
    const url = ENDPOINT.eliminarProductoCarrito(productoId); 

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { productoId }
    });

    toast.success('Producto eliminado del carrito');
    return response.data;  
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    toast.error('Error al eliminar el producto del carrito');
    throw new Error('Error al eliminar el producto del carrito');  
  }
};


export const getPedidosUsuario = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token no encontrado');
  }

  try {
    const response = await axios.get(ENDPOINT.obtenerPedidosUsuario(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los pedidos del usuario:', error);
    throw error;
  }
};


export const getPedidosGenerales = async () => {
  try {
    const response = await axios.get(ENDPOINT.obtenerPedidosGenerales);
    return response.data;  
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    throw error;  
  }
};