import React, { useState, useEffect, useContext } from "react";
import { auth } from "../services/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //this is where firebase creates the user, we only want to call this once though
  //So call it under a useEffect hook

  var actionCodeSettings = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //If the user is new and hasn't confirmed their email do not set them to currentUser instead
      //Send them to confirm their email
      console.log(user.emailVerified);

      if (user.emailVerified == false) {
        auth
          .sendSignInLinkToEmail(user.email, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", user.email);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ...
          });
      }

      //setCurrentUser(user);
      console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function confirmEmail(email) {
    return auth.sendSignInLinkToEmail(email);
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function signOut() {
    return auth.signOut();
    //Route to home screen and refresh the page plz
  }

  const values = {
    currentUser,
    signup,
    login,
    confirmEmail,
    resetPassword,
    signOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
