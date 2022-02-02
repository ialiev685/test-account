import React from "react";
import "./ButtonSubmit.scss";

export const ButtonSubmit = ({ className, caption = "кнопка" }) => {
  return (
    <button className={`button ${className}`} type="submit">
      {caption}
    </button>
  );
};
