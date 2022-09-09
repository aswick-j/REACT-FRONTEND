import React from "react";
import "../pages/RegsiterLogin.css";
import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { API_URL } from "../action/ServerConnection";

const RegisterLogin = () => {
  // const { setAuth } = useContext(AuthContext);
  // const userNameRef = useRef();
  // const errRef = useRef();

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
  //   userNameRef.current.focus();
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

  const registerSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);

    const id = "0987654321";

    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { username, email, password, id },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      console.log("--c-dc-", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
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

  const loginSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post(
        "http://localhost:5000/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      navigate("/");
    } catch (error) {
      console.error(error.data);
      navigate("/auth");
    }
  };
  return (
    <>
      <div className="respo">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={registerSubmit}>
              <label for="chk" aria-hidden="true">
                Sign up
              </label>
              
              <input
                value={username}
                // ref={userNameRef}
                onChange={handleUsername}
                // onFocus={() => setUserNameFocus(true)}
                // onBlur={() => setUserNameFocus(false)}
                placeholder="User name"
              />
              <input value={email} onChange={handleEmail} placeholder="Email" />
              <input
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
              <p aria-live="assertive" style={{ color: "red",textAlign:"center" }}>
                {errMsg}
              </p>
              <button type="submit">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={loginSubmit}>
              <label for="chk" aria-hidden="true">
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
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
