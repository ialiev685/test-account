import React from "react";
//форма
import { Formik } from "formik";
//styles
import "./styles.scss";
//api
import { API } from "../services";
//router
import { useNavigate, Link } from "react-router-dom";
//component
import { EmailControl } from "../components/EmailControl";
import { PasswordControl } from "../components/PasswordControl";
import { RepeatPasswordControl } from "../components/RepeatPasswordControl";
import { ButtonSubmit } from "../components/ButtonSubmit";

export const RegisterView = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper-form">
      <div className="wrapper-form__title">
        <h1 className="wrapper-form__name">Регистрация </h1>
        <Link className="wrapper-form__link" to="/login">
          Войти
        </Link>
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
          // console.log("val", values);
          //   console.log("act", actions);

          const { password, repeatPassword } = values;
          if (password !== repeatPassword) return;

          const sendData = {
            username: values.email,
            password: values.password,
            mailing: values.mailing,
          };

          // console.log("sendData", sendData);
          const result = await API.fetchRegisterUser(sendData);
          const { data } = result;
          // console.log("user id:", data);
          actions.resetForm();

          navigate(`/add-code/${data.id}`, { state: { email: values.email } });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="wrapper-form__form">
            <EmailControl
              className="wrapper-form__input"
              val={props.values.email}
              name={"email"}
              onChange={props.handleChange}
            />

            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            <PasswordControl
              className="wrapper-form__input"
              val={props.values.password}
              name={"password"}
              onChange={props.handleChange}
            />
            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}
            <RepeatPasswordControl
              className="wrapper-form__control"
              val={props.values.repeatPassword}
              name={"repeatPassword"}
              onChange={props.handleChange}
            />
            {props.errors.repeatPassword && (
              <div id="feedback">{props.errors.repeatPassword}</div>
            )}
            <div className="wrapper-form__mailing">
              <input
                id="mailing"
                type="checkbox"
                name="mailing"
                onChange={props.handleChange}
                value={props.values.mailing}
              />
              <label className="wrapper-form__label" htmlFor="mailing">
                Соглашаюсь на получение рассылки по электронной почте
              </label>
            </div>
            <div className="wrapper-form__dataProcessing">
              <input
                id="dataProcessing"
                type="checkbox"
                name="dataProcessing"
                onChange={props.handleChange}
                value={props.values.dataProcessing}
              />
              <label className="wrapper-form__label" htmlFor="dataProcessing">
                Соглашаюсь с политикой обработки персональных данных
              </label>
            </div>

            <ButtonSubmit
              className="wrapper-form__button"
              caption={"Регистрация"}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};
