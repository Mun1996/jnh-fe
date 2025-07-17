import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from '@/utils/request';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const request = useRequest();
  const navigate = useNavigate();

  /*自动读取 localStorage 中的用户信息*/
  useEffect(() => {
    const toHome = (roleName) => {
      if (roleName === "employer") {
        navigate("/employer", { replace: true });
      } else if (roleName === "employee") {
        navigate("/employee", { replace: true });
      }
    };/*判断身份*/

    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");/*取ID*/
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          toHome(parsedUser.roleName);
        }
      } catch (error) {
        console.error("Failed to load user data from localStorage", error);
      }
    };

    loadUserData();
  }, [navigate]);

  const setAuth = (authUser) => {
    try {
      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };

  const setUserData = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));/*登录后保存用户信息*/
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  };

  const clearAuth = async () => {
    try {
      // await request.post("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to clear user data", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
