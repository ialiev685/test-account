import React, { useState, useEffect } from "react";
//form
import { Formik } from "formik";
//components
import { ButtonSubmit } from "../ButtonSubmit";
import { SelectCategoryGender } from "../SelectCategory";
import { SelectCategoryStatus } from "../SelectCategory";
import { PanelSearchNameCountry } from "../PanelSearchName";
import { PanelSearchNameRegion } from "../PanelSearchName";
import { PanelSearchNameCity } from "../PanelSearchName";
//date
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
//icon
import { ReactComponent as DateIcon } from "../../icons/date.svg";
import { ReactComponent as ArrowSelect } from "../../icons/arrowSelect.svg";
//style
import "./FormPersonalData.scss";

const initDataPerson = {
  country: "",
  region: "",
  city: "",
  countryId: "",
  regionCode: "",
};

export const FormPersonalData = () => {
  const [data, setData] = useState(initDataPerson);
  const [showPanelSearchCountry, setShowPanelSearchCountry] = useState(false);
  const [showPanelSearchRegion, setShowPanelSearchRegion] = useState(false);
  const [showPanelSearchCity, setShowPanelSearchCity] = useState(false);
  const [curGetLocation, setCurGetLocation] = useState("");

  const togglePanelSearchCountry = (name = "") => {
    setCurGetLocation(name);
    setShowPanelSearchCountry((prevState) => !prevState);
  };
  const togglePanelSearchRegion = (name = "") => {
    setCurGetLocation(name);
    if (data.countryId) setShowPanelSearchRegion((prevState) => !prevState);
  };
  const togglePanelSearchCity = (name = "") => {
    setCurGetLocation(name);
    setShowPanelSearchCity((prevState) => !prevState);
  };

  const getDataLocation = (value) => {
    setData((prevState) => ({ ...prevState, ...value }));
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
        initialValues={{
          surname: "",
          name: "",
          patronymic: "",
          date: new Date(),
          country: "",
          region: "",
          city: "",
        }}
        onSubmit={async (values, actions) => {
          //   console.log("val", values);
          //   console.log("act", actions);
          // const sendData = {
          //   username: values.email,
          //   password: values.password,
          // };
          // console.log("sendData", sendData);
          // const result = await API.fetchLogin(sendData);
          // console.log("login", result);
          // const { data } = result;
          // if (data) {
          //   localStorage.setItem("token", JSON.stringify(data.token));
          //   actions.resetForm();
          //   navigate("/home");
          // }
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
            <SelectCategoryGender className="wrapper-formPerson__select" />
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
                  props.handleChange(e);
                }}
                closeOnSelect={true}
              />
              <DateIcon className="wrapper-formPerson__iconDate" />
            </div>
            <SelectCategoryStatus className="wrapper-formPerson__select" />
            <div className="wrapper-formPerson__wrapperInput">
              <input
                onClick={(e) => togglePanelSearchCountry(e.target.name)}
                autoComplete="off"
                name="country"
                placeholder="Страна"
                className="wrapper-formPerson__control"
                onChange={props.handleChange}
                // value={props.values.country}
                value={data.country}
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
                value={data.region}
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
                value={data.city}
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
