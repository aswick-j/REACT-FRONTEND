import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterLogin from "./pages/RegisterLogin";
import DataPage from "./pages/DataPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<RegisterLogin/>} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/data" element={<DataPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
