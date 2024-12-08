import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsuario({ nombre: "Usuario Prueba" });
    }
  }, []);

  const login = (userData) => {
    setUsuario(userData); 
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
export const useAuth = () => useContext(AuthContext);
