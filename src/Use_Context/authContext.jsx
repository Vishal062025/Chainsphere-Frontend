"use client"
import { createContext,useContext,useState } from "react";
import {  useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{


    const [authUser, setAuthUser] = useState(null);
    const [userDetails, setuserDetails] = useState(null);


    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    
        setAuthUser(token);
        setuserDetails(user);
      };
    
      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
        setAuthUser(null);
        setuserDetails(null);
      };

    useEffect(() => {
        const token  = localStorage.getItem("token");
        const user  = localStorage.getItem("user");
        if(token && user){
            setAuthUser(token);
            setuserDetails(user);
        }
    }, []);

    return( 
        <AuthContext.Provider value={{authUser, userDetails,setAuthUser,setuserDetails,login,logout}}>
            {children} 
        </AuthContext.Provider>
    );
}

export const userAuth = () => useContext(AuthContext)