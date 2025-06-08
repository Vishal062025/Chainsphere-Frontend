"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const router = useRouter();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthUser(token);
        router.push("/dashboard");

  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    router.push("/login");
  };


     const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        logout();
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/auth/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAuthUser(token);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      }
    };


  return (
    <AuthContext.Provider
      value={{
        authUser,
        userDetails,
        setAuthUser,
        setuserDetails,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
