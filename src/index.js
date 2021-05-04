import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";

//config firebase values here

firebase.initializeApp({
  apiKey: "AIzaSyAe_UlaDUOKGyFJUwnTl7u3JwY8P_XHrAE",
  authDomain: "memes-30d06.firebaseapp.com",
  projectId: "memes-30d06",
  storageBucket: "memes-30d06.appspot.com",
  messagingSenderId: "679186451315",
  appId: "1:679186451315:web:05e4836805ab929032d306",
  measurementId: "G-H62166RXZQ",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
