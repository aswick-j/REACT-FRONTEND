import axios from "axios";
import React from "react";

import "./LandingPage.css";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    navigate("/auth");
  };

  return (
    <>
      <div className = "bgcolor">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default LandingPage;
