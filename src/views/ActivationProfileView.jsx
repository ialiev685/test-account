import React, { useState, useEffect } from "react";
//yap
import * as Yup from "yup";
//форма
import { Formik } from "formik";
//router
import { useLocation, useNavigate } from "react-router-dom";
//api
import { API } from "../services";
//component
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { ButtonSubmit } from "../components/ButtonSubmit";

const validation = Yup.object({
  firstname: Yup.string().min(2).required(),
  lastname: Yup.string().min(2).required(),
  login: Yup.string().min(2).required(),
});

export const ActivationProfileView = () => {
  const [confirmData, setConfirmData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { userId, confirmationCode } = location.state;
    setConfirmData({ userId, confirmationCode });
  }, [location.state]);

  return (
    <Section>
      <Container>
        <div className="wrapper-activation">
          <h1 className="wrapper-activation__title">Анкета</h1>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              login: "",
            }}
            validationSchema={validation}
            onSubmit={async (values, actions) => {
              //   console.log("val", values);
              //   console.log("act", actions);

              const sendData = {
                userId: confirmData.userId,
                firstname: values.firstname,
                lastname: values.lastname,
                login: values.login,
                confirmationCode: confirmData.confirmationCode,
              };

              const result = await API.fetchActivateProfile(sendData);
              const { data } = result;

              actions.resetForm();

              navigate("/login");
            }}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className="wrapper-activation__form"
              >
                <input
                  autoComplete="off"
                  className="wrapper-activation__input"
                  placeholder="Имя"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstname}
                  name="firstname"
                />
                {props.errors.firstname && (
                  <div id="feedback">{props.errors.firstname}</div>
                )}
                <input
                  autoComplete="off"
                  placeholder="Фамилия"
                  className="wrapper-activation__input"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastname}
                  name="lastname"
                />
                {props.errors.lastname && (
                  <div id="feedback">{props.errors.lastname}</div>
                )}
                <input
                  autoComplete="off"
                  placeholder="Логин"
                  className="wrapper-activation__input"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.login}
                  name="login"
                />
                {props.errors.login && (
                  <div id="feedback">{props.errors.login}</div>
                )}
                <ButtonSubmit caption={"Активировать"} />
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  );
};
