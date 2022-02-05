import React, { createContext, useState, useEffect } from "react";

//api
import { API } from "../services";
//context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.fetchGetProfile(token).then((response) => {
        if (response?.data) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
