import React from "react";
//form
import { Formik } from "formik";
//component
import { EmailControl } from "../components/EmailControl";
import { PasswordControl } from "../components/PasswordControl";
import { ButtonSubmit } from "../components/ButtonSubmit";
//router
import { Link } from "react-router-dom";
//style
import "./styles.scss";
//api
import { API } from "../services";

export const LoginView = () => {
  return (
    <div className="wrapper-form">
      <div className="wrapper-form__title">
        <h2 className="wrapper-form__name">Авторизация</h2>
        <Link className="wrapper-form__link" to="/">
          Регистрация
        </Link>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, actions) => {
          //   console.log("val", values);
          //   console.log("act", actions);

          const sendData = {
            username: values.email,
            password: values.password,
          };
          // console.log("sendData", sendData);
          const result = await API.fetchLogin(sendData);
          console.log("login", result);
          const { data } = result;
          localStorage.setItem("token", JSON.stringify(data.token));
          // console.log("user id:", data);
          actions.resetForm();

          //   navigate(`/add-code/${data.id}`, { state: { email: values.email } });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="wrapper-form__form">
            <EmailControl
              name={"email"}
              className="wrapper-form__input"
              onChange={props.handleChange}
              val={props.values.email}
            />

            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            <PasswordControl
              name={"password"}
              onChange={props.handleChange}
              val={props.values.password}
            />
            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}

            <ButtonSubmit className="wrapper-form__button" caption={"Войти"} />
          </form>
        )}
      </Formik>
    </div>
  );
};
