import React, { useRef, useContext, useState } from "react";
//context
import { AuthContext } from "../../hoc";
//form
import { Formik } from "formik";
//icon
import { ReactComponent as ArrowSelect } from "../../icons/arrowSelect.svg";
import { ReactComponent as SmallCrossIcon } from "../../icons/smallCross.svg";
//api
import { API } from "../../services";
//components
import { ButtonSubmit } from "../ButtonSubmit";
import { PanelSearchNameSkills } from "../PanelSearchName";
//style
import "./FormPersonalData.scss";

export const FormPersonalSkills = ({ user }) => {
  const [data, setData] = useState([]);
  const [showPanelSearchSkills, setShowPanelSearchSkills] = useState(false);

  // const [curGetLocation, setCurGetLocation] = useState("");

  const formikRef = useRef();

  const { updateUser } = useContext(AuthContext);

  const togglePanelSearchSkills = (name = "") => {
    // setCurGetLocation(name);
    setShowPanelSearchSkills((prevState) => !prevState);
  };

  const getDataLocation = (value) => {
    formikRef.current.setFieldValue("skills", value.name);
    setData((prevState) => [...prevState, value]);
  };

  const fetchDeleteSkill = async (id) => {
    const token = localStorage.getItem("token");

    const result = await API.fetchDeleteSkill(token, id);
    if (result?.status === 200) {
      updateUser();
    }
  };

  return (
    <div className="wrapper-formPerson">
      <div className="wrapper-formPerson__title">
        <h2 className="wrapper-formPerson__name">Навыки</h2>
      </div>
      <div className="wrapper-formPerson__content">
        <ul className="wrapper-formPerson__list">
          {user &&
            user.skills.map(({ id, name }) => {
              const idNornmalize = id.toString();
              return (
                <li key={id} className="wrapper-formPerson__item">
                  <span className="wrapper-formPerson__itemName">{name}</span>
                  <SmallCrossIcon
                    className="wrapper-formPerson__itemIcon"
                    onClick={(id) => fetchDeleteSkill(idNornmalize)}
                  />
                </li>
              );
            })}
        </ul>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={{
          skills: "",
        }}
        onSubmit={async (values, actions) => {
          const dataSend = {
            name: values.skills,
          };

          const token = localStorage.getItem("token");
          if (token) {
            const result = await API.fetchAddSkill(token, dataSend);
            if (result?.status === 200) {
              updateUser();
            }
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
                name="skills"
                placeholder="Добавить категорию"
                className="wrapper-formPerson__control"
                onChange={props.handleChange}
                value={props.values.skills}
              />
              <ArrowSelect className="wrapper-formPerson__iconArrow" />
              {props.errors.skills && (
                <div id="feedback">{props.errors.skills}</div>
              )}
            </div>
            <ButtonSubmit
              className="wrapper-formPerson__button"
              caption={"Добавить"}
            />
          </form>
        )}
      </Formik>
      {showPanelSearchSkills && (
        <PanelSearchNameSkills
          infoLocation={data}
          // curGetLocation={curGetLocation}
          getDataLocation={getDataLocation}
          onShow={togglePanelSearchSkills}
        />
      )}
    </div>
  );
};
