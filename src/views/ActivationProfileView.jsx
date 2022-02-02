import React, { useState, useEffect } from "react";
//форма
import { Formik } from "formik";
//router
import { useLocation } from "react-router-dom";
//api
import { API } from "../services";

export const ActivationProfileView = () => {
  const [confirmData, setConfirmData] = useState({});

  const location = useLocation();

  useEffect(() => {
    const { userId, confirmationCode } = location.state;
    setConfirmData({ userId, confirmationCode });
  }, [location.state]);

  return (
    <div className="wrapper-register">
      <h1>Анкета</h1>

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          login: "",
        }}
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
          console.log("send data", sendData);
          const result = await API.fetchActivateProfile(sendData);
          const { data } = result;
          console.log("activation:", data);

          // actions.resetForm();

          //   navigate(`/add-code/${data.id}`, { state: { email: values.email } });
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
              className="wrapper-register__control"
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
              className="wrapper-register__control"
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.login}
              name="login"
            />
            {props.errors.login && (
              <div id="feedback">{props.errors.login}</div>
            )}

            <button className="wrapper-register__button" type="submit">
              Сохранить
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
