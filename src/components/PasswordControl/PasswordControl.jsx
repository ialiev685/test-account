import React, { useState, useEffect } from "react";
import "./PasswordControl.scss";

export const PasswordControl = ({
  className = "",
  name = "name",
  onChange,
  val,
}) => {
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (value) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [value]);

  return (
    <div className={`password ${className}`}>
      <input
        autoComplete="off"
        name={name}
        type="password"
        className="password__control"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        value={val}
      />
      <div
        className={`password__label ${
          empty ? "password__label--down" : "password__label--up"
        }`}
      >
        Пароль
      </div>
    </div>
  );
};
