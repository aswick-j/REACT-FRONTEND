import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterLogin from "./pages/RegisterLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<RegisterLogin/>} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
