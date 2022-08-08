import React from "react";
import "../pages/RegsiterLogin.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
const RegisterLogin = () => {
  const userRef = useRef("");
  const errRef = useRef("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    setSuccessmsg(true);
    const id="0987654321";
    try {
      const data = axios.post(
        "http://localhost:5000/adduser",({ username, email, password,id }),{headers:{"Content-Type" : "application/json"}}
      );
      console.log({ username, email, password,id });
    } catch(error) {
      console.error(error.data); 
    }
  };

  const [username, setUsername] = useState("");
  const [usernamefocus, setUsernamefocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailfocus, setEmailfocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordfocus, setPasswordfocus] = useState(false);

  const [successmsg, setSuccessmsg] = useState("");
  const [errormsg, setErrormsg] = useState(false);

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
  //   const data = axios.post("http://localhost:5000/api/users");
  // }, [handleSubmit]);

  return (
    <>
      <div className="respo">
        <p ref={errRef} className={errormsg ? "errScreen" : "sucScreen"}>
          {errormsg}
        </p>
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={handleSubmit}>
              <label for="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                value={username}
                onChange={handleUsername}
                placeholder="User name"
                onFocus={() => setUsernamefocus(true)}
                onBlur={() => setUsernamefocus(false)}
              />
              <input
                value={email}
                onChange={handleEmail}
                placeholder="Email"
                onFocus={() => setEmailfocus(true)}
                onBlur={() => setEmailfocus(false)}
              />
              <input
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                onFocus={() => setPasswordfocus(true)}
                onBlur={() => setPasswordfocus(false)}
              />
              <button type="submit">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form>
              <label for="chk" aria-hidden="true">
                Login
              </label>
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="pswd" placeholder="Password" />
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
