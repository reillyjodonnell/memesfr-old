import React, { useState } from "react";
import Login from "./Login";
import Register from "./SignUp";
import Home from "./Home";
import AuthProvider from "../contexts/AuthContext";
import ResetPassword from "./ResetPassword";

export default function Memesfr() {
  const [register, openRegister] = useState(false);
  const [signIn, openSignIn] = useState(false);
  const [home, displayHome] = useState(true);

  const updateRegister = () => {
    displayHome(!home);
    openRegister(!register);
  };
  const updateSignIn = () => {
    displayHome(!home);
    openSignIn(!signIn);
  };

  return (
    <div>
      <AuthProvider>
        {home ? (
          <Home updateSignIn={updateSignIn} updateRegister={updateRegister} />
        ) : null}
        {}
        {register ? (
          <>
            <Register updateRegister={updateRegister} />
          </>
        ) : null}
        {signIn ? <Login /> : null}
      </AuthProvider>
    </div>
  );
}
