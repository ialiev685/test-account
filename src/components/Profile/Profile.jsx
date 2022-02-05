import React, { useContext } from "react";
//style
import "./Profile.scss";
//context
import { AuthContext } from "../../hoc";

export const Profile = ({ onModal }) => {
  const user = useContext(AuthContext);
  console.log("profile", user);

  return (
    <div className="profile">
      <h2 className="profile__title"></h2>
      <ul className="profile__list">
        <li className="profile__item">
          <button className="buttonProfile buttonProfile--skills">
            Заполните профиль
          </button>
        </li>
        <li className="profile__item">
          <button className="buttonProfile" onClick={onModal}>
            Личные данные
          </button>
        </li>
        <li className="profile__item">
          <button className="buttonProfile" onClick={onModal}>
            Навыки
          </button>
        </li>
      </ul>
    </div>
  );
};
