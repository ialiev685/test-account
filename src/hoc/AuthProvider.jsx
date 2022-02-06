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
const initStatusList = [
  { id: 1, name: "Школьник" },
  { id: 2, name: "Студент" },
  { id: 3, name: "Специалист" },
  { id: 4, name: "Антрепренер" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [listStatus, setListStatus] = useState(initStatusList);
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
    // setUser(data);
    const token = localStorage.getItem("token");
    API.fetchGetProfile(token).then((response) => {
      if (response?.data) {
        setUser(response.data);
      }
    });
  };

  // const fetchGetProfile = (token) => {
  //   API.fetchGetProfile(token).then((response) => {
  //     if (response?.data) {
  //       setUser(response.data);
  //       API.fetchGetListStatus(token).then((response) => {
  //         setListStatus(response.data);
  //       });
  //     }
  //   });
  // };

  const fetchGetProfile = async (token) => {
    const resultProfile = await API.fetchGetProfile(token);
    if (resultProfile?.data) {
      const resultStatus = await API.fetchGetListStatus(token);
      setUser(resultProfile.data);
      setListStatus(resultStatus.data);
    }
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
    listSex,
    listStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
