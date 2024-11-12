import { createContext, useEffect, useState } from "react";

export const ProductosContext = createContext();

const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);  // El carrito inicial es un array vacío
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Obtener los productos al montar el componente
  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    // Filtrar productos según la categoría seleccionada
    if (categoriaSeleccionada) {
      setProductosFiltrados(productos.filter(producto => producto.category === categoriaSeleccionada));
    } else {
      setProductosFiltrados(productos);
    }
  }, [productos, categoriaSeleccionada]);

  const getProductos = async () => {
    // Aquí cargas los productos de algún endpoint (o archivo local, etc.)
    const res = await fetch("/productos.json");
    const productos = await res.json();
    setProductos(productos);
    setProductosFiltrados(productos);
  };

  const addToCart = (producto) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya está en el carrito
      const exists = prevCart.find(item => item.id === producto.id);
      if (exists) {
        // Si ya existe, incrementamos la cantidad
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no existe, lo añadimos con cantidad 1
        return [...prevCart, { ...producto, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (producto) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === producto.id);
      if (exists.quantity === 1) {
        // Si la cantidad es 1, lo eliminamos del carrito
        return prevCart.filter(item => item.id !== producto.id);
      } else {
        // De lo contrario, restamos la cantidad
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  // Calculamos el total del carrito y la cantidad de artículos
  const total = cart.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
  const totalArticulosCarrito = cart.reduce((acc, producto) => acc + producto.quantity, 0);

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <ProductosContext.Provider value={{
      productosFiltrados, 
      addToCart, 
      removeFromCart, 
      total, 
      totalArticulosCarrito, 
      seleccionarCategoria, 
      cart  // Aseguramos que el carrito está disponible en el contexto
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductoProvider;
