import React, { useState, useEffect } from "react";
//form
import { Formik } from "formik";
//components
import { ButtonSubmit } from "../ButtonSubmit";
import { SelectCategoryGender } from "../SelectCategory";
import { SelectCategoryStatus } from "../SelectCategory";
import { PanelSearchName } from "../PanelSearchName";

//style
import "./FormPersonalData.scss";
//api
import { API } from "../../services";

const initListSelect = {
  country: [],
  region: [],
  city: [],
};

export const FormPersonalData = () => {
  const [queryCountry, setQueryCountry] = useState("");
  const [listsSelect, setListsSelect] = useState(initListSelect);
  const [showPanelSearch, setShowPanelSearch] = useState(false);

  const togglePanelSearch = () => {
    setShowPanelSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const query = {
        name: "Ка",
        languageCode: "RU",
      };
      API.fetchGetListCountry(token, query).then((response) => {
        const { data: country } = response.data;

        setListsSelect((prevState) => ({ ...prevState, country }));
      });
    }
  }, []);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   API.fetchGetListStatus(token).then((response) => console.log(response));
    // }
  }, []);

  return (
    <div className="wrapper-formPerson">
      <div className="wrapper-formPerson__title">
        <p>
          Если ты заполнишь это поле, то получишь возможности общаться с людьми,
          получать бонусы
        </p>
      </div>
      <Formik
        initialValues={{
          surname: "",
          name: "",
          patronymic: "",
          country: "",
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
              className="wrapper-formPerson__input wrapper-formPerson__input--bold"
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
              className="wrapper-formPerson__input wrapper-formPerson__input--bold"
              onChange={props.handleChange}
              value={props.values.name}
            />

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <input
              autoComplete="off"
              name="patronymic"
              placeholder="Отчество"
              className="wrapper-formPerson__input wrapper-formPerson__input--bold"
              onChange={props.handleChange}
              value={props.values.name}
            />

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <SelectCategoryGender />
            <SelectCategoryStatus />

            <input
              onClick={() => togglePanelSearch()}
              autoComplete="off"
              name="country"
              placeholder="Страна"
              className="wrapper-formPerson__input"
              onChange={props.handleChange}
              value={props.values.country}
            />

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <ButtonSubmit
              className="wrapper-form__button"
              caption={"Сохранить"}
            />
          </form>
        )}
      </Formik>
      {showPanelSearch && <PanelSearchName onShow={togglePanelSearch} />}
    </div>
  );
};
