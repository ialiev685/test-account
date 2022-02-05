import React, { useContext } from "react";
//context
import { AuthContext } from "../hoc";
//router
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ components }) => {
  const { user } = useContext(AuthContext);
  // console.log("private", user);

  if (user) {
    return components;
  }

  return <Navigate to="/login" />;
};
