import React from "react";
import { Formik } from "formik";
//styles
import "./styles.scss";
//api
import { API } from "../services";
//router
import { useNavigate } from "react-router-dom";

export const RegisterView = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper-register">
      <div className="wrapper-register__title">
        <h1>Регистрация </h1>
        <button>Войти</button>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
          mailing: false,
          dataProcessing: false,
        }}
        onSubmit={async (values, actions) => {
          //   console.log("val", values);
          //   console.log("act", actions);

          const { password, repeatPassword } = values;
          if (password !== repeatPassword) return;

          const sendData = {
            username: values.email,
            password: values.password,
            mailing: values.mailing,
          };

          const result = await API.fetchRegisterUser(sendData);
          const { data } = result;
          // console.log("user id:", data);
          actions.resetForm();
          navigate(`/add-code/${data.id}`);
        }}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="wrapper-register__form"
          >
            <input
              autoComplete="off"
              className="wrapper-register__control"
              type="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              name="email"
            />
            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            <input
              autoComplete="off"
              className="wrapper-register__control"
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
            />
            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}
            <input
              autoComplete="off"
              className="wrapper-register__control"
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.repeatPassword}
              name="repeatPassword"
            />
            {props.errors.repeatPassword && (
              <div id="feedback">{props.errors.repeatPassword}</div>
            )}

            <input
              id="mailing"
              type="checkbox"
              name="mailing"
              onChange={props.handleChange}
              value={props.values.mailing}
            />
            <label htmlFor="mailing">
              Соглашаюсь на получение рассылки по электронной почте
            </label>
            <input
              id="dataProcessing"
              type="checkbox"
              name="dataProcessing"
              onChange={props.handleChange}
              value={props.values.dataProcessing}
            />
            <label htmlFor="dataProcessing">
              Соглашаюсь с политикой обработки персональных данных
            </label>
            <button className="wrapper-register__button" type="submit">
              Регистрация
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
