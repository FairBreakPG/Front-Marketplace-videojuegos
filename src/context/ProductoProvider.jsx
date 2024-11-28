import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';  // Import toast
import { agregarAlCarro, getCarro } from '../services/api'; 
import 'react-toastify/dist/ReactToastify.css';
import { URLBASE } from '../config/apiconfig'; 

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const res = await fetch(`${URLBASE}/productos`)
      if (!res.ok) {
        throw new Error('Error al obtener productos');
      }
      const productos = await res.json();
      setProductos(productos); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token'); 
      if (!userId || !token) return;

      setLoading(true);
      try {
        const response = await getCarro(userId, token); 
        if (response && Array.isArray(response.items)) {
          setCart(response.items); 
        }
      } catch (error) {
        console.error('Error al obtener carrito desde el backend:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

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

  const total = Array.isArray(cart) ? cart.reduce((acc, producto) => acc + (producto.precio * producto.quantity), 0) : 0;
  const totalArticulosCarrito = Array.isArray(cart) 
  ? cart.reduce((acc, producto) => acc + producto.cantidad, 0) 
  : 0;

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart)); 
  }, [cart]);

  return (
    <ProductosContext.Provider value={{
      productos, addToCart, total, totalArticulosCarrito, cart, setCart
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
