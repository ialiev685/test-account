import React from "react";
//register page
import { RegisterView } from "./views/RegisterView.jsx";
//add code page
import { AddCodeView } from "./views/AddCodeView.jsx";
//router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterView />} />
        <Route path="/addCode/:id" element={<AddCodeView />} />
      </Routes>
    </div>
  );
}

export default App;
