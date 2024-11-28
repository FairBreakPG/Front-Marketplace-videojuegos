import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { agregarAlCarro, getCarro } from '../services/api'; // Asegúrate de importar getCarro
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINT } from '../config/apiconfig'; 

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos();  
    fetchCart();   
  }, []);

  const getProductos = async () => {
    try {
      const res = await fetch(`${ENDPOINT.productos}`);
      if (!res.ok) {
        throw new Error('Error al obtener productos');
      }
      const productos = await res.json();
      setProductos(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const fetchCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;  

    setLoading(true);
    try {
      const cartData = await getCarro(userId); 
      if (Array.isArray(cartData.items)) {
        setCart(cartData.items);  
      } else {
        setCart([]);  
      }
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
      setError("Hubo un problema al obtener el carrito");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (producto) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("No se encontró el ID de usuario");
      return;
    }
    try {
      const response = await agregarAlCarro(producto.id, 1, userId); 
      setCart(response.items);  
      toast.success(`${producto.nombre} agregado al carrito!`);
    } catch (error) {
      toast.error("Error al agregar producto al carrito");
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await axios.delete(`${ENDPOINT.quitarItemcarro(productId)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response && response.data.message === 'Producto eliminado del carrito') {
        setCart(cart.filter(item => item.id !== productId));  
        toast.success('Producto eliminado correctamente');
      } else {
        toast.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.error('Hubo un problema al eliminar el producto del carrito');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.cantidad, 10) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const totalArticulosCarrito = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart)); 
  }, [cart]);

  return (
    <ProductosContext.Provider value={{
      productos, addToCart, removeFromCart, calculateTotal, totalArticulosCarrito, cart, loading, error
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
