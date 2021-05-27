import React, { useState, useEffect, useContext } from "react";
import { auth, db, storage } from "../services/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadUser, setLoadUser] = useState(true);
  const [userExists, setUserExists] = useState(true);
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

  function uploadMeme(image, title, type) {
    var author = currentUser.uid;
    var ud = currentUser.displayName;
    const upload = storage.ref(`memes/${title}`).put(image);
    var num_shards = 5;
    var batch = db.batch();
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
          .then((url, id) => {
            console.log(id);
            console.log(url);
            //1 read here
            var memeRef = db.collection("memes");
            memeRef
              .add(
                {
                  userName: ud,
                  author: author,
                  image: url,
                  title: title,
                  likes: 0,
                  dislikes: 0,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  fileType: type,
                },
                { merge: true }
              )
              .then((data) => {
                db.collection("memes").doc(data.id).add({
                  imageID: data.id,
                });
                var userRef = db.collection("users").doc(author);
                batch.set(
                  userRef,
                  {
                    createdPosts: firebase.firestore.FieldValue.arrayUnion(
                      data.id
                    ),
                  },
                  { merge: true }
                );
                var counterRef = db.collection("counters").doc(data.id);
                // Initialize the counter document
                batch.set(counterRef, { num_shards: num_shards });
                // Initialize each shard with count=0
                for (let i = 0; i < num_shards; i++) {
                  const shardRef = counterRef
                    .collection("shards")
                    .doc(i.toString());
                  batch.set(shardRef, { count: 0 });
                }

                // Commit the write batch
                batch
                  .commit()
                  .then((res) => {
                    console.log("success", res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    );
  }
  //Make a call to the firestore and retrieve the documents
  //Map over all of the results and set each one to state
  //At the end of it return the entirety of state
  async function retrieveRecentPosts() {
    setLoadingFilter(true);
    const recentRef = db.collection("recent").doc("recent_twenty");
    const collections = await recentRef.get();
    var items = collections.data();
    var updatedObjects = items.posts.map((item) => {
      //For each item look through the shards and tally them up
      var shardRef = db.collection("counters").doc(item.id);
      var totalLikesOnPost = shardRef
        .collection("shards")
        .get()
        .then((snapshot) => {
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count += doc.data().count;
          });
          return total_count;
        });
      var updatedMemeObject = totalLikesOnPost
        .then((resolvedPromiseForNumberOfLikes) => {
          var userid = item.id;
          var usersname = item.userDisplay;
          var titleName = item.title;
          var authorName = item.author;
          var likeNumber = item.likes;
          var imageSource = item.image;
          var created = item.createdAt;
          var docData = {
            userDisplay: usersname,
            title: titleName,
            author: authorName,
            likes: resolvedPromiseForNumberOfLikes,
            image: imageSource,
            createdAt: created,
          };

          return docData;
        })
        .then((updatedMemeData) => {
          return updatedMemeData;
        });

      setLoadingFilter(false);
      return updatedMemeObject;
    });
    console.log(updatedObjects);
    return updatedObjects;

    //updatedObjects is an array of promises. How do we turn each promise into an array with actual values?
  }

  // async function updateLikeCount(id) {
  //   var shardRef = db.collection("counters").doc(id);
  //   var totalLikesOnPost = shardRef
  //     .collection("shards")
  //     .get()
  //     .then((snapshot) => {
  //       let total_count = 0;
  //       snapshot.forEach((doc) => {
  //         total_count += doc.data().count;
  //       });
  //       return total_count;
  //     });
  // }

  async function retrievePopularPosts() {
    setLoadingFilter(true);
    const popRef = db.collection("popular").doc("top_twenty");
    const collections = await popRef.get();
    var items = collections.data();
    var results = items.posts;

    var updatedObjects = items.posts.map((item) => {
      //For each item look through the shards and tally them up
      var shardRef = db.collection("counters").doc(item.id);
      var totalLikesOnPost = shardRef
        .collection("shards")
        .get()
        .then((snapshot) => {
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count += doc.data().count;
          });
          return total_count;
        });
      var updatedMemeObject = totalLikesOnPost
        .then((resolvedPromiseForNumberOfLikes) => {
          var userid = item.id;
          var usersname = item.userDisplay;
          var titleName = item.title;
          var authorName = item.author;
          var likeNumber = item.likes;
          var imageSource = item.image;
          var created = item.createdAt;
          var docData = {
            userDisplay: usersname,
            title: titleName,
            author: authorName,
            likes: resolvedPromiseForNumberOfLikes,
            image: imageSource,
            createdAt: created,
          };

          return docData;
        })
        .then((updatedMemeData) => {
          return updatedMemeData;
        });

      setLoadingFilter(false);
      return updatedMemeObject;
    });
    console.log(updatedObjects);
    return updatedObjects;
  }

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
    var items = [
      {
        createdPosts: [],
      },
      {
        hearted: [],
      },
      {
        likedPosts: [],
      },
    ];

    db.collection("usernames").doc(id).set({ uid: value });
    db.collection("users").doc(value).set({ items });
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

  //How do we count the total number of likes on the post?

  function heartPost(postID) {
    var userID = currentUser.uid;

    /*
    db.collection("users").doc(id).set({ uid: value });
    */
    console.log(`Adding ${postID} to ${userID}'s favorites`);

    //add to the user's heart
  }
  function hasUserLikedPost(postID) {
    console.log("Checking if user has previously liked the post");
  }

  async function likePost(postID) {
    console.log(postID);
    var userID = currentUser.uid;
    var num_shards = 5;
    var ref = db.collection("counters").doc(postID);

    //Add it to the users' liked posts and merge it
    var userRef = db.collection("users").doc(userID);
    const likePostRef = await userRef.update(
      {
        likedPosts: firebase.firestore.FieldValue.arrayUnion(postID),
      },
      { merge: true }
    );

    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection("shards").doc(shard_id);

    // Update count
    shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
  }
  function dislikePost(postID) {
    var userID = currentUser.uid;
    const num_shards = 5;
    var ref = db.collection("counters").doc(postID);

    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection("shards").doc(shard_id);

    // Update count
    shard_ref.update("count", firebase.firestore.FieldValue.increment(1));

    //Write to the shard
    console.log(`Adding dislike from post ${postID} to ${userID}'s disliked`);
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
    uploadMeme,
    checkUsernameAvailability,
    userExists,
    loadUser,
    sendConfirmationEmail,
    addUsernameToDB,
    updateProfile,
    loadingFilter,
    retrievePopularPosts,
    retrieveRecentPosts,
    likePost,
    dislikePost,
    heartPost,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
