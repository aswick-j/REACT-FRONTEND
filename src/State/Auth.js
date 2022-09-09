import React, { useState } from "react";

import { AuthContext } from "../context/Auth";

const AuthState = (props) => {
//   const intialState = {};

  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
