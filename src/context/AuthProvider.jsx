import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");

    if (token && storedUser) {
      setUsuario(JSON.parse(storedUser)); 
    }
  }, []);

  const login = (userData) => {
    setUsuario(userData); 
    localStorage.setItem("token", userData.token);
    localStorage.setItem("usuario", JSON.stringify(userData)); 
  };

  const logout = () => {
    setUsuario(null); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("usuario"); 
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
export default AuthProvider; 