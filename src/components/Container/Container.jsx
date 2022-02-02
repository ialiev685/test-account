import React from "react";
import "./Container.scss";

export const Container = ({ children, className = "" }) => {
  return <div className={`container ${className}`}>{children}</div>;
};
