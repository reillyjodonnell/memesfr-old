import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./SignUp";
import Home from "./Home";
import AuthProvider from "../contexts/AuthContext";
import ResetPassword from "./ResetPassword";
import CreateProfile from "./CreateProfile";
import Help from "./Help"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Register} />
            <Route path="/setup" component={CreateProfile} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/login" component={Login} />
            <Route path="/help" component={Help} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
