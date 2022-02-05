import React, { useContext } from "react";
//form
import { Formik } from "formik";
//context
import { AuthContext } from "../hoc";
//component
import { EmailControl } from "../components/EmailControl";
import { PasswordControl } from "../components/PasswordControl";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
//router
import { Link } from "react-router-dom";
//style
import "./styles.scss";
//api
import { API } from "../services";

export const LoginView = () => {
  const { signIn } = useContext(AuthContext);

  return (
    <Section>
      <Container>
        <div className="wrapper-form">
          <div className="wrapper-form__title">
            <h2 className="wrapper-form__name">Авторизация</h2>
            <Link className="wrapper-form__link" to="/register">
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
              // console.log("login", result);
              const { data } = result;

              if (data) {
                // localStorage.setItem("token", data.token);
                const token = data.token;
                actions.resetForm();
                signIn(token);
              }
            }}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className="wrapper-form__form"
              >
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

                <ButtonSubmit
                  className="wrapper-form__button"
                  caption={"Войти"}
                />
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  );
};
