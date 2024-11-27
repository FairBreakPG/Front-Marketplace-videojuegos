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
      //const res = await fetch('http://localhost:3000/productos');  --activar forma local
      const res = await fetch(`${URLBASE}/productos`)
      if (!res.ok) {
        throw new Error('Error al obtener productos');
      }
      const productos = await res.json();
      console.log('Productos recibidos:', productos);
      setProductos(productos); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart || []); 
      } catch (error) {
        console.error("Error al parsear el carrito desde localStorage:", error);
        setCart([]);  
      }
    } else {
      setCart([]);  
    }
  }, []); 
  const addToCart = async (producto) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error("No se encontró el ID de usuario");
        return;
      }
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
      productos, addToCart, total, totalArticulosCarrito, cart,setCart
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
