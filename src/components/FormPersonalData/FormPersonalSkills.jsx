import React, { useRef, useContext, useState } from "react";
//context
import { AuthContext } from "../../hoc";
//form
import { Formik } from "formik";
//icon
import { ReactComponent as ArrowSelect } from "../../icons/arrowSelect.svg";
//api
import { API } from "../../services";
//components
import { ButtonSubmit } from "../ButtonSubmit";
import { PanelSearchNameSkills } from "../PanelSearchName";

export const FormPersonalSkills = ({ user }) => {
  const [data, setData] = useState("");

  const [showPanelSearchCountry, setShowPanelSearchCountry] = useState(false);

  const [curGetLocation, setCurGetLocation] = useState("");

  const formikRef = useRef();

  const { addListStatus } = useContext(AuthContext);

  const togglePanelSearchSkills = (name = "") => {
    setCurGetLocation(name);
    setShowPanelSearchCountry((prevState) => !prevState);
  };

  const getDataLocation = (value) => {
    console.log("form", value);
    let valueInput;
    if (curGetLocation === "country") {
      valueInput = Object.values(value)[2];
    }

    if (curGetLocation === "region") {
      valueInput = Object.values(value)[3];
    }

    if (curGetLocation === "city") {
      valueInput = Object.values(value)[4];
    }

    formikRef.current.setFieldValue(curGetLocation, valueInput);
    // setData((prevState) => ({ ...prevState, [curGetLocation]: value }));
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
          console.log("val", values);

          //   const dataSend = {
          //     firstname: values.name,
          //     lastname: values.surname,
          //     patronymic: values.patronymic,
          //     sex: values.sex,
          //     birthDate: values.date,
          //     personStatusId: values.personStatusId,
          //     languageCode: "RU",
          //     location: {
          //       languageCode: "RU",
          //       country: data.country,
          //       region: data.region,
          //       city: data.city,
          //     },
          //   };

          const token = localStorage.getItem("token");
          if (token) {
            // console.log(dataSend);
            // const result = await API.fetchUpdateProfile(token, dataSend);
            // console.log("result", result);
          }
        }}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="wrapper-formPerson__form"
          >
            <div className="wrapper-formPerson__wrapperInput">
              <input
                onClick={(e) => togglePanelSearchSkills(e.target.name)}
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
        <PanelSearchNameSkills
          infoLocation={data}
          curGetLocation={curGetLocation}
          getDataLocation={getDataLocation}
          onShow={togglePanelSearchSkills}
        />
      )}
    </div>
  );
};
