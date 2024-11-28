import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../config/apiconfig'; 

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos();  
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
      setError('Hubo un problema al obtener los productos');
      toast.error('Error al obtener productos');
    }
  };

  return (
    <ProductosContext.Provider value={{
      productos, loading, error
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
