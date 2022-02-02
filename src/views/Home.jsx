import React from "react";
//components
import { Container } from "../components/Container";
import { Navigation } from "../components/Navigation";
import { Profile } from "../components/Profile";

export const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <h2 className="home__logo">LOGO</h2>
      </header>
      <div className="home__wrapperProfile">
        <Navigation />
        <Container className={"login"}>
          <Profile />
        </Container>
      </div>
    </div>
  );
};