import React, { useState, useEffect } from "react";
//style
import "./Profile.scss";
//component
import { BoardPersonalData, BoardPersonalSkills } from "../BoardPersonalData";
import { ButtonShowProfileData } from "../ButtonShowProfileData";

export const Profile = ({ onModal, user }) => {
  const [showDetalis, setShowDetalis] = useState(true);
  const noEmptyProfile = user.skills.length && user.location;

  return (
    <div className="profile">
      <h2 className="profile__title">
        {user.firstname} {user.lastname}
      </h2>
      <p className="profile__text">
        {user.location.city ? user.location.city.city : "город неизвестен­"}
      </p>
      <ButtonShowProfileData
        stateShowDetalis={showDetalis}
        statusEmpty={noEmptyProfile}
        onShowDetalis={setShowDetalis}
      />
      {showDetalis && (
        <ul className="profile__list">
          <li className="profile__item">
            {user.location.country === null ? (
              <button className="buttonProfile" onClick={onModal}>
                Личные данные
              </button>
            ) : (
              <BoardPersonalData onModal={onModal} user={user} />
            )}
          </li>
          <li className="profile__item">
            {user.skills.length === 0 ? (
              <button
                className="buttonProfile"
                onClick={() => onModal("skills")}
              >
                Навыки
              </button>
            ) : (
              <BoardPersonalSkills onModal={onModal} user={user} />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
