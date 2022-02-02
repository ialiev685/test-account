import React, { useState, useEffect } from "react";
import "./RepeatPasswordControl.scss";

export const RepeatPasswordControl = ({
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
        type="password"
        className="password__control"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        name={name}
        value={val}
      />
      <div
        className={`password__label ${
          empty ? "password__label--down" : "password__label--up"
        }`}
      >
        Повторите пароль
      </div>
    </div>
  );
};
