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
  const [recentlyUploaded, setRecentlyUploaded] = useState([]);
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
    var userPic = currentUser.photoURL;

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
            //1 read here
            var memeRef = db.collection("memes");
            var uniqueIdentifier = memeRef.doc().id;
            memeRef
              .doc(uniqueIdentifier)
              .set(
                {
                  id: uniqueIdentifier,
                  userName: ud,
                  author: author,
                  authorPic: userPic,
                  image: url,
                  title: title,
                  likes: 0,
                  dislikes: 0,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  fileType: type,
                },
                { merge: true }
              )

              .then(() => {
                var userRef = db.collection("users").doc(author);
                batch.set(
                  userRef,
                  {
                    createdPosts: firebase.firestore.FieldValue.arrayUnion(
                      uniqueIdentifier
                    ),
                  },
                  { merge: true }
                );
                var sample = {
                  id: uniqueIdentifier,
                  userName: ud,
                  author: author,
                  authorPic: userPic,
                  image: url,
                  title: title,
                  likes: 0,
                  dislikes: 0,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  fileType: type,
                };
                console.log(sample);
                setRecentlyUploaded((prevState) => [sample, ...prevState]);
                var counterRef = db
                  .collection("counters")
                  .doc(uniqueIdentifier);
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

  async function hasUserLikedPost(postID) {
    var currentUserID = currentUser.uid;
    var referenceToPost = db.collection("users").doc(currentUserID);
    var doc = await referenceToPost.get();
    var likedPosts = doc.data().likedPosts;
    var heartedPosts = doc.data().hearted;
    var distinct = [{ likedPosts }, { heartedPosts }];
    return distinct;
  }

  //Make a call to the firestore and retrieve the documents
  //Map over all of the results and set each one to state
  //At the end of it return the entirety of state
  async function retrieveRecentPosts() {
    setLoadingFilter(true);
    const recentRef = db.collection("recent").doc("recent_fifty");
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
          var docData = {
            userName: item.userName,
            title: item.title,
            author: item.author,
            authorPic: item.authorPic,
            likes: resolvedPromiseForNumberOfLikes,
            image: item.image,
            createdAt: item.createdAt,
            id: item.id,
          };

          return docData;
        })
        .then((updatedMemeData) => {
          return updatedMemeData;
        });

      setLoadingFilter(false);
      return updatedMemeObject;
    });
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
    const popRef = db.collection("popular").doc("top_fifty");
    const collections = await popRef.get();
    var items = collections.data();
    var results = items.posts;

    var updatedObjects = items.posts.map((item) => {
      console.log(item);
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
          var docData = {
            userName: item.userName,
            title: item.title,
            author: item.author,
            authorPic: item.authorPic,
            likes: resolvedPromiseForNumberOfLikes,
            image: item.image,
            createdAt: item.createdAt,
            id: item.id,
          };

          return docData;
        })
        .then((updatedMemeData) => {
          return updatedMemeData;
        });

      setLoadingFilter(false);
      return updatedMemeObject;
    });
    return updatedObjects;
  }

  async function checkUsernameAvailability(id) {
    var username = id.toLowerCase();
    //Prevent throwing error
    if (user && id.length >= 5) {
      var search = await db.collection("usernames").doc(username).get();
      const data = search.data();
      if (data === undefined) {
        return undefined;
      } else {
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

  async function retrieveRandomMeme() {
    console.log("beginning random meme search");
    var memes = db.collection("memes");
    var key = memes.doc().id;
    console.log(key);
    var randomMeme = {};
    await memes
      .where(firebase.firestore.FieldPath.documentId(), ">=", key)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.size > 0) {
          var updatedValue = {};
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            //For each item look through the shards and tally them up
            var shardRef = db.collection("counters").doc(doc.data().id);
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
                var docData = {
                  userName: doc.data().userName,
                  title: doc.data().title,
                  author: doc.data().author,
                  authorPic: doc.data().authorPic,
                  likes: resolvedPromiseForNumberOfLikes,
                  image: doc.data().image,
                  createdAt: doc.data().createdAt,
                  id: doc.data().id,
                };
                return docData;
              })
              .then((updatedMemeData) => {
                return updatedMemeData;
              });
            setLoadingFilter(false);
            updatedValue = updatedMemeObject;
            return updatedMemeObject;
          });
          console.log(updatedValue);
          randomMeme = updatedValue;
          return updatedValue;
        } else {
          var meme = memes
            .where(firebase.firestore.FieldPath.documentId(), "<", key)
            .limit(1)
            .get()
            .then((snapshot) => {
              var updatedValue = {};
              snapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                //For each item look through the shards and tally them up
                var shardRef = db.collection("counters").doc(doc.data().id);
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
                    var docData = {
                      userName: doc.data().userName,
                      title: doc.data().title,
                      author: doc.data().author,
                      authorPic: doc.data().authorPic,
                      likes: resolvedPromiseForNumberOfLikes,
                      image: doc.data().image,
                      createdAt: doc.data().createdAt,
                      id: doc.data().id,
                    };
                    return docData;
                  })
                  .then((updatedMemeData) => {
                    return updatedMemeData;
                  });
                setLoadingFilter(false);
                updatedValue = updatedMemeObject;
                return updatedMemeObject;
              });
              console.log(updatedValue);
              return updatedValue;
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting documents", error);
      });
    return randomMeme;
  }
  async function removeHeartPost(postId) {
    var userID = currentUser.uid;

    //Remove it from the users' liked posts and merge it
    var userRef = db.collection("users").doc(userID);
    await userRef.update({
      hearted: firebase.firestore.FieldValue.arrayRemove(postId),
    });

    console.log(`Removed ${postId} to ${userID}'s favorites`);
  }
  async function heartPost(postID) {
    console.log("Sending hearted post to DB", postID);
    var userID = currentUser.uid;

    //Add it to the users' liked posts and merge it
    var userRef = db.collection("users").doc(userID);
    await userRef.update(
      {
        hearted: firebase.firestore.FieldValue.arrayUnion(postID),
      },
      { merge: true }
    );

    /*
    db.collection("users").doc(id).set({ uid: value });
    */
    console.log(`Adding ${postID} to ${userID}'s favorites`);

    //add to the user's heart
  }

  //Grab the array of strings that the user has liked
  //Go through the string and remove the one string that contains the passed postID
  //Return a new string and push the array back into the user data
  async function removeLikePost(postID) {
    console.log("Removing post id: ", postID);
    var userID = currentUser.uid;
    var num_shards = 5;
    var ref = db.collection("counters").doc(postID);

    //Add it to the users' liked posts and merge it
    var userRef = db.collection("users").doc(userID);
    await userRef.update({
      likedPosts: firebase.firestore.FieldValue.arrayRemove(postID),
    });

    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection("shards").doc(shard_id);

    // Update count
    shard_ref.update("count", firebase.firestore.FieldValue.increment(-1));
  }

  async function likePost(postID) {
    console.log("Adding like to the database");
    var userID = currentUser.uid;
    var num_shards = 5;
    var ref = db.collection("counters").doc(postID);

    //Add it to the users' liked posts and merge it
    var userRef = db.collection("users").doc(userID);
    await userRef.update(
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
    let mount = true;
    if (mount === true) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          console.log(user.emailVerified);
          setCurrentUser(user);
        }

        setLoadUser(false);
        console.log(currentUser);
      });
      return unsubscribe;
    }
    return () => (mount = false);
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
    hasUserLikedPost,
    recentlyUploaded,
    retrieveRandomMeme,
    removeLikePost,
    removeHeartPost,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
