import React from "react";
//register page
import { RegisterView } from "./views";
//add code page
import { AddCodeView } from "./views";
//activation profile
import { ActivationProfileView } from "./views";
//login
import { LoginView } from "./views";
//router
import { Routes, Route } from "react-router-dom";
//sryle
import "./App.scss";
//component
import { Container } from "./components/Container";

function App() {
  console.log("сработал");
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<RegisterView />} />
          <Route path="/add-code/:id" element={<AddCodeView />} />
          <Route path="/activate-profile" element={<ActivationProfileView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
