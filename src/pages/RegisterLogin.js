import React from "react";
import "../pages/RegsiterLogin.css";
import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { API_URL } from "../action/ServerConnection";

import bcrypt from "bcryptjs";

const RegisterLogin = () => {
  // const { setAuth } = useContext(AuthContext);
  const userNameRef = useRef();
  const passwordRef = useRef();
  // const errRef = useRef();

  const salt = bcrypt.genSaltSync(10);

  const [username, setUsername] = useState("");
  const [validuserName, setValiduserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // console.log("=====s===",errMsg);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // useEffect(() => {
  // const data =   userNameRef.current.value
  // console.log(userNameRef.current.value);
  // }, []);

  useEffect(() => {
    setValiduserName(username);
  }, [username]);

  useEffect(() => {
    setValidEmail(email);
  }, [email]);

  useEffect(() => {
    setValidPwd(password);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const navigate = useNavigate();

  const hashedPassword = bcrypt.hashSync(password, salt);

  const registerSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);

    const id = "0987654321";

    try {
      const password = hashedPassword;
      const response = await axios.post(
        `${API_URL}/register`,
        { username, email, password, id },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      console.log("--c-dc-", response.data);
      // setUsername("");
      // setEmail("");
      // setPassword("");
      navigate("/");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Beared${response.data.token}`;
      console.log({ username, email, password, id });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Email Already Registerd");
      } else {
        setErrMsg("Some Field is Missing");
      }
      console.error(error.data);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      console.log("--c-dc-", response.data);
      navigate("/");
    } catch (error) {
      console.error(error.data);
      navigate("/auth");
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Email Not Found or Incorrect Password");
      } else {
        setErrMsg("Some Field is Missing");
      }
    }
  };
  return (
    <>
      <div className="respo">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={registerSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>

              <input
                value={username}
                ref={userNameRef}
                onChange={handleUsername}
                // onFocus={() => setUserNameFocus(true)}
                // onBlur={() => setUserNameFocus(false)}
                placeholder="User name"
              />
              <input value={email} onChange={handleEmail} placeholder="Email" />
              <input
                ref={passwordRef}
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
              <p
                aria-live="assertive"
                style={{ color: "red", textAlign: "center" }}
              >
                {errMsg}
              </p>
              <button type="submit">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={loginSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleEmail}
              />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                onChange={handlePassword}
              />
              <p
                aria-live="assertive"
                style={{ color: "red", textAlign: "center" }}
              >
                {errMsg}
              </p>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
