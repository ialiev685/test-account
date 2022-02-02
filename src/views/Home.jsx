import React, { useState } from "react";
//components
import { Container } from "../components/Container";
import { Navigation } from "../components/Navigation";
import { Profile } from "../components/Profile";
import { Modal } from "../components/Modal";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="home">
      <header className="home__header">
        <h2 className="home__logo">LOGO</h2>
      </header>
      <div className="home__wrapperProfile">
        <Navigation />
        <Container className={"login"}>
          <Profile onModal={toggleModal} />
        </Container>
      </div>
      {showModal && <Modal onModal={toggleModal} />}
    </div>
  );
};
