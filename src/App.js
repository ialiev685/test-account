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
//private, public route
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
//sryle
import "./App.scss";
//HOC
import { AuthProvider } from "./hoc";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<PublicRoute components={<LoginView />} />}
          />

          <Route
            path="/register"
            element={<PublicRoute components={<RegisterView />} />}
          />

          <Route path="/add-code/:id" element={<AddCodeView />} />

          <Route path="/activate-profile" element={<ActivationProfileView />} />

          <Route
            path="/login"
            element={<PublicRoute components={<LoginView />} />}
          />

          <Route
            path="/home"
            element={<PrivateRoute components={<Home />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
