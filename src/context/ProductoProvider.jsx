import { createContext, useEffect, useState } from "react";

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    const res = await fetch("/productos.json");
    const productos = await res.json();
    setProductos(productos);
  };

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === producto.id);
      if (exists) {
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...producto, quantity: 1 }];
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

  return (
    <ProductosContext.Provider value={{ productos, cart, addToCart, removeFromCart, total }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
