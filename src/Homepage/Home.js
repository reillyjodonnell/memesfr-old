import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

export default function Home(props) {
  return (
    <div>
      <Dashboard
        updateSignIn={props.updateSignIn}
        updateRegister={props.updateRegister}
      />
    </div>
  );
}
