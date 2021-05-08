import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [availability, setAvailability] = useState(true);

  var actionCodeSettings = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

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

  function uploadMeme() {
    console.log("Uploading your dank meme");
    db.collection("memes")
      .doc("LA")
      .set({ name: "LA", state: "CA", Country: "USA" });
  }

  function sendToDB() {
    console.log("Executed.. sending to DB now");
    db.collection("cities")
      .doc("LA")
      .set({ name: "LA", state: "CA", Country: "USA" });
  }

  async function checkUsernameAvailability(id) {
    var search = await db.collection("usernames").doc(id).get();
    const data = search.data();
    console.log("Beginning search. Have received ", data, id, search);
    if (data != undefined) {
      console.log("username taken");
    } else if (data === undefined) {
      console.log("Username available");
    }
  }

  function setUserName(username) {
    currentUser
      .updateProfile({
        displayName: username,
      })
      .then(
        function () {
          console.log("SUCCESS");
        },
        function (error) {
          console.log(error);
        }
      );
  }

  function setProfilePicture(url) {
    currentUser
      .updateProfile({
        photoURL: url,
      })
      .then(
        function () {
          console.log("SUCCESS");
        },
        function (error) {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user.emailVerified);
      setCurrentUser(user);
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

  const values = {
    currentUser,
    signup,
    login,
    confirmEmail,
    resetPassword,
    signOut,
    setUserName,
    setProfilePicture,
    sendToDB,
    uploadMeme,
    checkUsernameAvailability,
    availability,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
