import React from "react";
//style
import "./Profile.scss";
//component
import { BoardPersonalData, BoardPersonalSkills } from "../BoardPersonalData";

export const Profile = ({ onModal, user }) => {
  return (
    <div className="profile">
      <h2 className="profile__title">
        {user.firstname} {user.lastname}
      </h2>
      <p className="profile__text">
        {user.location.city ? user.location.city.city : "город неизвестен­"}
      </p>
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
          <button className="buttonProfile" onClick={() => onModal("skills")}>
            Навыки
          </button>
        </li>
      </ul>
      <BoardPersonalData onModal={onModal} user={user} />
      <BoardPersonalSkills onModal={onModal} user={user} />
    </div>
  );
};
