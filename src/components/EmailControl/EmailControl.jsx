import React, { useState, useEffect } from "react";
import "./EmailControl.scss";

export const EmailControl = ({
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
    <div className={`email ${className}`}>
      <input
        autoComplete="off"
        type="text"
        className="email__control"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        name={name}
        value={val}
      />
      <div
        className={`email__label ${
          empty ? "email__label--down" : "email__label--up"
        }`}
      >
        E-mail
      </div>
    </div>
  );
};
