import { createContext, useEffect, useState } from "react";

export const PizzasContext = createContext();

const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = async () => {
    const res = await fetch("/pizzas.json");
    const pizzas = await res.json();
    setPizzas(pizzas);
  };

  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === pizza.id);
      if (exists) {
        return prevCart.map(item =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (pizza) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === pizza.id);
      if (exists.quantity === 1) {
        return prevCart.filter(item => item.id !== pizza.id);
      } else {
        return prevCart.map(item =>
          item.id === pizza.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const total = cart.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);

  return (
    <PizzasContext.Provider value={{ pizzas, cart, addToCart, removeFromCart, total }}>
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
