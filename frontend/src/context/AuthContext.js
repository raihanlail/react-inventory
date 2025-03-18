import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Token tidak valid:", error);
        setUser(null);
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.data.token);
      const decodedUser = jwtDecode(response.data.token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Login gagal:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
