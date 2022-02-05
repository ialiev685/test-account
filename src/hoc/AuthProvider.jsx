import React, { createContext, useState, useEffect } from "react";

//api
import { API } from "../services";
//context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const signIn = (token) => {
    localStorage.setItem("token", token);
    fetchGetProfile(token);
  };

  const fetchGetProfile = (token) => {
    API.fetchGetProfile(token).then((response) => {
      if (response?.data) {
        setUser(response.data);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //   API.fetchGetProfile(token).then((response) => {
      //     if (response?.data) {
      //       setUser(response.data);
      //     }
      //   });
      fetchGetProfile(token);
    }
  }, []);

  const value = { user, signOut, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
