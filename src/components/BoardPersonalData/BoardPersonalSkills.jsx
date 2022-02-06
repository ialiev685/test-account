import React from "react";
//icons

import { ReactComponent as EdidIcon } from "../../icons/Edit.svg";

export const BoardPersonalSkills = ({ user, onModal }) => {
  return (
    <div className="presonal-data">
      <div className="presonal-data__header">
        <h2 className="presonal-data__title">Навыки</h2>
        <button
          className="presonal-data__buttonClose"
          onClick={() => onModal("skills")}
        >
          <EdidIcon />
        </button>
      </div>

      <div className="presonal-data__body">
        <ul className="presonal-data__list">
          {user.skills &&
            user.skills.map(({ id, name }) => {
              return (
                <li key={id} className="presonal-data__item">
                  {name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
