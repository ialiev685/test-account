import React, { useState, useContext } from "react";
//components
import { Container } from "../components/Container";
import { Navigation } from "../components/Navigation";
import { Profile } from "../components/Profile";
import { Modal } from "../components/Modal";
import { FormPersonalData } from "../components/FormPersonalData";
//context
import { AuthContext } from "../hoc";
//style
import "./styles.scss";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const { user, signOut } = useContext(AuthContext);
  console.log("home", user);
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="home">
      <header className="home__header">
        <h2 className="home__logo">LOGO</h2>
        <div className="home__login">
          <img
            className="home__avatar"
            src={require("../icons/avatar2.jpg")}
            alt="аватаркa"
            width="25"
            height="25"
          />
          <span className="home__title">
            {user.login ? user.login : "unknow"}
          </span>
          <button className="home__buttonExit" onClick={() => signOut()}>
            Выйти
          </button>
        </div>
      </header>
      <div className="home__wrapperProfile">
        <Navigation />
        <Container className={"login"}>
          <Profile user={user} onModal={toggleModal} />
        </Container>
      </div>
      {showModal && (
        <Modal onModal={toggleModal}>
          <FormPersonalData user={user} />
        </Modal>
      )}
    </div>
  );
};
