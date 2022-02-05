import React, { useContext } from "react";
//style
import "./BoardPersonalData.scss";
//helpers
import { calcDiffDate } from "../../helpers/calcDiffDate";
//context
import { AuthContext } from "../../hoc";
//icons
import { ReactComponent as FlagIcon } from "../../icons/flag.svg";
import { ReactComponent as LocationIcon } from "../../icons/location.svg";

export const BoardPersonalData = ({ user }) => {
  const { listStatus, listSex } = useContext(AuthContext);

  const statusName = listStatus.find(({ id }) => id === user.personStatusId);
  const sexName = listSex.find(({ id }) => id === user.sex);

  return (
    <div className="presonal-data">
      <div className="presonal-data__header">
        <h2 className="presonal-data__title">Личные данные</h2>
        <div className="presonal-data__location">
          <span className="presonal-data__country">
            <FlagIcon />
            <span className="presonal-data__countryName">
              {user.location.country.name}
            </span>
          </span>
          <span className="presonal-data__city">
            <LocationIcon />
            <span className="presonal-data__cityName">
              {user.location.city.name}
            </span>
          </span>
        </div>
      </div>
      <div className="presonal-data__body">
        <span className="presonal-data__data">{`Пол: ${sexName.name}`}</span>
        <span className="presonal-data__data">{`Возраст: ${calcDiffDate(
          user.birthDate
        )}`}</span>
        <span className="presonal-data__data">{`Статус: ${
          statusName?.name ? statusName.name : ""
        }`}</span>
      </div>
    </div>
  );
};
