import { createContext, useState, useEffect } from 'react';

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);  
  const [productosFiltrados, setProductosFiltrados] = useState([]);


  useEffect(() => {
    getProductos();
  }, []);


  const getProductos = async () => {
    try {
      const res = await fetch('http://localhost:3000/productos');
      if (!res.ok) {
        throw new Error('Error al obtener productos');
      }
      const productos = await res.json();
      console.log('Productos recibidos:', productos);
      setProductos(productos);
      setProductosFiltrados(productos); // Inicializa productos filtrados con todos los productos
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('carrito')) || [];
    setCart(storedCart);
  }, []);

 
  const addToCart = (producto) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === producto.id);
      if (exists) {
     
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
      
        const newCart = [...prevCart, { ...producto, quantity: 1 }];
        console.log('Nuevo carrito:', newCart); 
        return newCart;
      }
    });
  };


  const removeFromCart = (producto) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === producto.id);
      if (exists.quantity === 1) {
        return prevCart.filter(item => item.id !== producto.id);
      } else {
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };


  const total = cart.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
  const totalArticulosCarrito = cart.reduce((acc, producto) => acc + producto.quantity, 0);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductosContext.Provider value={{
      productosFiltrados,
      addToCart,
      removeFromCart,
      total,
      totalArticulosCarrito,
      cart
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
