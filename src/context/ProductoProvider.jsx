import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../config/apiconfig';

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
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
      setFilteredProductos(productos); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Hubo un problema al obtener los productos');
      toast.error('Error al obtener productos');
    }
  };

 
  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter((producto) => producto.categoria === category);
      setFilteredProductos(filtered);
    }
  };

  return (
    <ProductosContext.Provider value={{
      productos: filteredProductos, 
      loading, 
      error,
      filterByCategory 
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
