import React from "react";
//views
import {
  RegisterView,
  AddCodeView,
  ActivationProfileView,
  LoginView,
  Home,
} from "./views";

//router
import { Routes, Route } from "react-router-dom";
//sryle
import "./App.scss";
//component
// import { Container } from "./components/Container";

function App() {
  return (
    <div className="App">
      {/* <Container> */}
      <Routes>
        <Route path="/" element={<RegisterView />} />
        <Route path="/add-code/:id" element={<AddCodeView />} />
        <Route path="/activate-profile" element={<ActivationProfileView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      {/* </Container> */}
    </div>
  );
}

export default App;
