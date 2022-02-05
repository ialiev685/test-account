import React, { useContext } from "react";
//context
import { AuthContext } from "../hoc";
//router
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ components }) => {
  const user = useContext(AuthContext);
  // console.log("public", user);

  if (!user) {
    return components;
  }

  return <Navigate to="/home" state={user} />;
};
