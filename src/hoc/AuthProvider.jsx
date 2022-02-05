import React, { createContext, useState, useEffect } from "react";

//api
import { API } from "../services";
//context
export const AuthContext = createContext(null);

const initSexList = [
  { id: 1, name: "Мужчина" },
  { id: 2, name: "Женщина" },
  { id: 3, name: "Другого не дано" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [listStatus, setListStatus] = useState([]);
  const [listSex] = useState(initSexList);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const signIn = (token) => {
    localStorage.setItem("token", token);
    fetchGetProfile(token);
  };

  const updateUser = (data) => {
    setUser(data);
  };

  const addListStatus = (data) => {
    setListStatus(data);
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
      fetchGetProfile(token);
    }
  }, []);

  const value = {
    user,
    signOut,
    signIn,
    updateUser,
    addListStatus,
    listSex,
    listStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
