import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Login/SignUp";
import Home from "../Homepage/Home";

export default function Memesfr() {
  const [register, openRegister] = useState(false);
  const [displayRegister, update] = useState(0);

  const updateRegister = () => {
    openRegister(!register);
  };

  return (
    <div>
      <Home />
      {}
      {displayRegister ? (
        <>
          <Register updateRegister={updateRegister} />

          <Login updateRegister={updateRegister} />
        </>
      ) : null}
    </div>
  );
}
