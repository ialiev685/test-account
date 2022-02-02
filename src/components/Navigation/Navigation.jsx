import React from "react";
//router
import { Link } from "react-router-dom";
//style
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/" className="navigation__link">
            Регистрация
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/home" className="navigation__link">
            Личный кабинет
          </Link>
        </li>
      </ul>
    </nav>
  );
};
