import React, { useState, useEffect, useContext } from "react";
import { auth, db, storage } from "../services/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import admin, { firestore } from "firebase-admin";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadUser, setLoadUser] = useState(true);
  const [userExists, setUserExists] = useState(true);
  const [popularItems, setPopularItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  const [loadingFilter, setLoadingFilter] = useState(false);
  const history = useHistory();

  var actionCodeSettings = {
    url: "http://localhost:3000/setup",
    handleCodeInApp: true,
  };

  var user = auth.currentUser;

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function confirmEmail(email) {
    auth.sendSignInLinkToEmail(email, actionCodeSettings).then(
      function () {
        console.log("sent email");
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

  //this currently takes up about 22 reads
  function uploadMeme(image, title) {
    var author = currentUser.uid;
    var ud = currentUser.displayName;
    const upload = storage.ref(`memes/${title}`).put(image);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        //This is 1 write
        storage
          .ref("memes")
          .child(title)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            //1 read here
            db.collection("memes")
              .add({
                userName: ud,
                author: author,
                image: url,
                title: title,
                likes: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(
                (data) => {
                  //1 read here
                  db.collection("users")
                    .doc(author)
                    .set({
                      createdPosts: firebase.firestore.FieldValue.arrayUnion(
                        data
                      ),
                    });
                },
                { merge: true }
              )
              .catch((error) => {
                console.log(error);
              });
          });
      }
    );
  }

  /* function retrievePopularPosts 
  Since this will be universal (all people will see the same top posts)
  lets query a single document to find the top posts (reading say 100 posts)
  then when everyone clicks the popular icon to filter
  it returns the "Popular document"

  We would only need to update the popular document once every hour or so depending on demand
  So how do we create such a document?

  */
  //Here we will retrieve a series of posts that have already been ordered

  //Retrieves the posts but doesn't organize the results in order.
  //Also we need to transfer the id to become the id of the new popular post
  //If the ids match then don't add the document otherwise if they don't match
  //Update the list (reorganize resort likes etc..)
  function referenceRecentPosts() {
    console.log("Searching...");
    setLoadingFilter(true);
    var memesRef = db.collection("memes");
    setRecentItems([]);
    memesRef
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          var copiedID = item.id;
          var items = item.data();
          console.log(items);
          var usersname = items.userName;
          var titleName = items.title;
          var authorName = items.author;
          var likeNumber = items.likes;
          var imageSource = items.image;
          var created = items.createdAt;
          var docData = {
            userDisplay: usersname,
            id: copiedID,
            title: titleName,
            author: authorName,
            likes: likeNumber,
            image: imageSource,
            createdAt: created,
          };
          setRecentItems((prevState) => [...prevState, docData]);

          db.collection("recent")
            .doc("recent_twenty")
            .set(
              {
                posts: firebase.firestore.FieldValue.arrayUnion(docData),
              },
              { merge: true }
            )
            .then((data) => {
              console.log(data);
              setLoadingFilter(false);
            })
            .catch((error) => {
              console.log("ERROR: ", error);
            });
        });
      });

    console.log("Search has ended");
  }

  //Now the issue is, if there are likes on these posts, I'll have to update both the post under memes and the post
  //created under popular. Solution: just reference the original post in popular by using the same ID
  function referencePopularPosts() {
    console.log("Searching...");
    setLoadingFilter(true);
    var memesRef = db.collection("memes");
    setPopularItems([]);
    memesRef
      .orderBy("likes", "desc")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          var copiedID = item.id;
          var items = item.data();
          console.log(items);
          var usersname = items.userName;
          var titleName = items.title;
          var authorName = items.author;
          var likeNumber = items.likes;
          var imageSource = items.image;
          var created = items.createdAt;
          var docData = {
            userDisplay: usersname,
            id: copiedID,
            title: titleName,
            author: authorName,
            likes: likeNumber,
            image: imageSource,
            createdAt: created,
          };
          setPopularItems((prevState) => [...prevState, docData]);

          db.collection("popular")
            .doc("top_twenty")
            .set(
              {
                posts: firebase.firestore.FieldValue.arrayUnion(docData),
              },
              { merge: true }
            )
            .then((data) => {
              console.log(data);
              setLoadingFilter(false);
            })
            .catch((error) => {
              console.log("ERROR: ", error);
            });
        });
      });

    console.log("Search has ended");
  }

  function sendToDB() {
    //1 read
    console.log("Executed.. sending to DB now");
    db.collection("cities")
      .doc("LA")
      .set({ name: "LA", state: "CA", Country: "USA" });
  }

  /*
  Here the user is going to like a post 
  Two things need to happen:
    1. Write into the document and increment the count by 1
    (Similiarly when the user dislikes a post we will have to retrieve the same document)
    2. Write into a collection of the user's likes a document with the id of the id of the post (For retrieval later to see the posts/memes they've liked)


  */
  function increment(col, document, action) {
    const increase = db.FieldValue.increment(1);
    const decrease = db.FieldValue.increment(-1);
    //Now we need to pass the current
    const postRef = db.collection(`${col}`).doc(`${document}`);
    postRef.update({ likes: increment });
  }

  //many many reads (exponentially increases based on the number of users and number of queries)
  async function checkUsernameAvailability(id) {
    var username = id.toLowerCase();
    //Prevent throwing error
    if (user && id.length >= 5) {
      var search = await db.collection("usernames").doc(username).get();
      const data = search.data();
      console.log(data);
      if (data === undefined) {
        console.log(`${id} available`);
        return undefined;
      } else {
        console.log(`${id} taken`);
        return false;
      }
    }
  }
  //1 read
  function addUsernameToDB(id) {
    var value = user.uid;
    console.log(id);
    console.log(value);
    db.collection("usernames").doc(id).set({ uid: value });
  }

  function updateProfile(name, file) {
    console.log(name, file);
    addUsernameToDB(name);
    setUserName(name);
    setProfilePicture(file);
    history.push("");
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

  function setProfilePicture(file) {
    var id = user.uid;
    var imageFile = URL.createObjectURL(file);
    const upload = storage.ref(`users/${id}`).put(file);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("users")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            currentUser.updateProfile({
              photoURL: url,
            });
          });
      }
    );
    currentUser
      .updateProfile({
        photoURL: imageFile,
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
    addUsernameToDB,
    updateProfile,
    referencePopularPosts,
    popularItems,
    referenceRecentPosts,
    recentItems,
    loadingFilter,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
