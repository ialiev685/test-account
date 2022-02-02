import React from "react";
//style
import "./Profile.scss";

export const Profile = () => {
  return (
    <div className="profile">
      <ul className="profile__list">
        <li className="profile__item">
          <button className="buttonProfile buttonProfile--skills">
            Заполните профиль
          </button>
        </li>
        <li className="profile__item">
          <button className="buttonProfile">Личные данные</button>
        </li>
        <li className="profile__item">
          <button className="buttonProfile">Навыки</button>
        </li>
      </ul>
    </div>
  );
};
