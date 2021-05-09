import React, { useState, useEffect, useContext } from "react";
import { auth, db, storage } from "../services/firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadUser, setLoadUser] = useState(true);
  const [userExists, setUserExists] = useState(true);
  const history = useHistory();
  const [availability, setAvailability] = useState(false);

  var actionCodeSettings = {
    url: "http://localhost:3000/setup",
    handleCodeInApp: true,
  };

  var user = auth.currentUser;
  console.log(user);

  function signup(email, password) {
    history.push("/signup");

    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    history.push("/login");

    return auth.signInWithEmailAndPassword(email, password);
  }
  function confirmEmail(email) {
    history.push("/confirm");
    auth.sendSignInLinkToEmail(email).then(
      function () {
        console.log("Signed out");
        history.push("/");
        history.go(0);
      },
      function (error) {
        console.log(error);
      }
    );
  }
  function resetPassword(email) {
    history.push("/reset");

    return auth.sendPasswordResetEmail(email);
  }
  function signOut() {
    auth.signOut().then(
      function () {
        console.log("Signed out");
        history.push("/");
        history.go(0);
      },
      function (error) {
        console.log(error);
      }
    );

    //Route to home screen and refresh the page plz
  }

  function uploadMeme(image, title) {
    var author = currentUser.uid;
    console.log("Uploading your dank meme");
    const upload = storage.ref(`memes/${title}`).put(image);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("memes")
          .child(title)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            db.collection("memes")
              .doc(author)
              .set({ author: author, image: url, title: title });
          });
      }
    );
  }

  function sendToDB() {
    console.log("Executed.. sending to DB now");
    db.collection("cities")
      .doc("LA")
      .set({ name: "LA", state: "CA", Country: "USA" });
  }

  function checkUsernameAvailability(id) {
    console.log(id);
    if (id > 4) {
      var search = db.collection("usernames").doc(id).get();
      const data = search.data().object;
      console.log(data);
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

  function sendConfirmationEmail() {
    auth
      .sendSignInLinkToEmail(user.email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", user.email);
        console.log("Email successfully sent");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    /*
    if (user.emailVerified == false) {
      auth
        .sendSignInLinkToEmail(user.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", user.email);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    */
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.emailVerified);
        setCurrentUser(user);
      }

      setLoadUser(false);
      /* THIS WILL SEND THE EMAIL
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
      */

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
    userExists,
    loadUser,
    sendConfirmationEmail,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
