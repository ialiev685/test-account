import React from "react";
//style
import "./Section.scss";

export const Section = ({ children, className = "" }) => {
  return <section className={`section ${className}`}>{children}</section>;
};
