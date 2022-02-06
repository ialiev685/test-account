import React, { useState, useEffect, useRef, useContext } from "react";
//api
import { API } from "../../services";
//form
import { Formik } from "formik";
//components
import { ButtonSubmit } from "../ButtonSubmit";
import { SelectCategoryGender } from "../SelectCategory";
import { SelectCategoryStatus } from "../SelectCategory";
import {
  PanelSearchNameCountry,
  PanelSearchNameRegion,
  PanelSearchNameCity,
} from "../PanelSearchName";

//date
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
//icon
import { ReactComponent as DateIcon } from "../../icons/date.svg";
import { ReactComponent as ArrowSelect } from "../../icons/arrowSelect.svg";
//style
import "./FormPersonalData.scss";
//helpers
import { dateFormatter } from "../../helpers/dateFormatter";
//context
import { AuthContext } from "../../hoc";

const initDataPerson = {
  country: "",
  region: "",
  city: "",
};

export const FormPersonalData = ({ user, onShowModal }) => {
  const [data, setData] = useState(initDataPerson);

  const [showPanelSearchCountry, setShowPanelSearchCountry] = useState(false);
  const [showPanelSearchRegion, setShowPanelSearchRegion] = useState(false);
  const [showPanelSearchCity, setShowPanelSearchCity] = useState(false);
  const [curGetLocation, setCurGetLocation] = useState("");
  const [listStatus, setListStatus] = useState([]);

  const formikRef = useRef();

  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.fetchGetListStatus(token).then((response) => {
        if (response?.data) {
          setListStatus(response.data);
        }
      });
    }
  }, []);

  const togglePanelSearchCountry = (name = "") => {
    setCurGetLocation(name);
    setShowPanelSearchCountry((prevState) => !prevState);
  };
  const togglePanelSearchRegion = (name = "") => {
    setCurGetLocation(name);
    if (data.country.wikiDataId)
      setShowPanelSearchRegion((prevState) => !prevState);
  };
  const togglePanelSearchCity = (name = "") => {
    setCurGetLocation(name);
    if (data.region.wikiDataId)
      setShowPanelSearchCity((prevState) => !prevState);
  };

  const getDataLocation = (value) => {
    let valueInput;
    if (curGetLocation === "country") {
      valueInput = Object.values(value)[2];
    }

    if (curGetLocation === "region") {
      console.log("region", value);
      valueInput = Object.values(value)[3];
    }

    if (curGetLocation === "city") {
      valueInput = Object.values(value)[4];
    }

    formikRef.current.setFieldValue(curGetLocation, valueInput);
    setData((prevState) => ({ ...prevState, [curGetLocation]: value }));
  };

  const inputDateProps = {
    name: "date",
    className: "wrapper-formPerson__control",
  };

  return (
    <div className="wrapper-formPerson">
      <div className="wrapper-formPerson__title">
        <p className="wrapper-formPerson__text">
          Если ты заполнишь это поле, то получишь возможности общаться с людьми,
          получать бонусы
        </p>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={{
          surname: user.lastname,
          name: user.firstname,
          patronymic: "",
          date: new Date(),
          country: "",
          region: "",
          city: "",
        }}
        onSubmit={async (values, actions) => {
          const dataSend = {
            firstname: values.name,
            lastname: values.surname,
            patronymic: values.patronymic,
            sex: values.sex,
            birthDate: values.date,
            personStatusId: values.personStatusId,
            languageCode: "RU",
            location: {
              languageCode: "RU",
              country: data.country,
              region: data.region,
              city: data.city,
            },
          };

          const token = localStorage.getItem("token");
          if (token) {
            const result = await API.fetchUpdateProfile(token, dataSend);
            if (result?.data) {
              updateUser();
              onShowModal();
            }
          }
        }}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="wrapper-formPerson__form"
          >
            <input
              autoComplete="off"
              placeholder="Фамилия"
              name="surname"
              className="wrapper-formPerson__input"
              onChange={props.handleChange}
              value={props.values.surname}
            />
            {props.errors.surname && (
              <div id="feedback">{props.errors.surname}</div>
            )}
            <input
              autoComplete="off"
              name="name"
              placeholder="Имя"
              className="wrapper-formPerson__input"
              onChange={props.handleChange}
              value={props.values.name}
            />

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <input
              autoComplete="off"
              name="patronymic"
              placeholder="Отчество"
              className="wrapper-formPerson__input "
              onChange={props.handleChange}
              value={props.values.patronymic}
            />

            {props.errors.patronymic && (
              <div id="feedback">{props.errors.patronymic}</div>
            )}
            <SelectCategoryGender
              name={"sex"}
              onChange={props.handleChange}
              className="wrapper-formPerson__select"
            />
            <div className="wrapper-formPerson__wrapperInput">
              <Datetime
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                inputProps={inputDateProps}
                initialValue={props.values.date}
                onChange={(value) => {
                  const e = {
                    target: {
                      value: value._d,
                      id: "date",
                      name: "date",
                    },
                  };

                  e.target.value = dateFormatter(e.target.value);
                  props.handleChange(e);
                }}
                closeOnSelect={true}
              />
              <DateIcon className="wrapper-formPerson__iconDate" />
            </div>
            <SelectCategoryStatus
              name={"personStatusId"}
              onChange={props.handleChange}
              data={listStatus}
              className="wrapper-formPerson__select"
            />
            <div className="wrapper-formPerson__wrapperInput">
              <input
                onClick={(e) => togglePanelSearchCountry(e.target.name)}
                autoComplete="off"
                name="country"
                placeholder="Страна"
                className="wrapper-formPerson__control"
                onChange={props.handleChange}
                value={props.values.country}
              />
              <ArrowSelect className="wrapper-formPerson__iconArrow" />

              {props.errors.country && (
                <div id="feedback">{props.errors.country}</div>
              )}
            </div>
            <div className="wrapper-formPerson__wrapperInput">
              <input
                onClick={(e) => togglePanelSearchRegion(e.target.name)}
                autoComplete="off"
                name="region"
                placeholder="Регион"
                className="wrapper-formPerson__control"
                onChange={props.handleChange}
                value={props.values.region}
              />
              <ArrowSelect className="wrapper-formPerson__iconArrow" />

              {props.errors.region && (
                <div id="feedback">{props.errors.region}</div>
              )}
            </div>
            <div className="wrapper-formPerson__wrapperInput">
              <input
                onClick={(e) => togglePanelSearchCity(e.target.name)}
                autoComplete="off"
                name="city"
                placeholder="Город"
                className="wrapper-formPerson__control"
                onChange={props.handleChange}
                value={props.values.city}
              />
              <ArrowSelect className="wrapper-formPerson__iconArrow" />
              {props.errors.city && (
                <div id="feedback">{props.errors.city}</div>
              )}
            </div>
            <ButtonSubmit
              className="wrapper-formPerson__button"
              caption={"Сохранить"}
            />
          </form>
        )}
      </Formik>
      {showPanelSearchCountry && (
        <PanelSearchNameCountry
          infoLocation={data}
          curGetLocation={curGetLocation}
          getDataLocation={getDataLocation}
          onShow={togglePanelSearchCountry}
        />
      )}
      {showPanelSearchRegion && (
        <PanelSearchNameRegion
          infoLocation={data}
          curGetLocation={curGetLocation}
          getDataLocation={getDataLocation}
          onShow={togglePanelSearchRegion}
        />
      )}
      {showPanelSearchCity && (
        <PanelSearchNameCity
          infoLocation={data}
          curGetLocation={curGetLocation}
          getDataLocation={getDataLocation}
          onShow={togglePanelSearchCity}
        />
      )}
    </div>
  );
};
