// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

function referenceRecentPosts() {
  console.log("Searching...");
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

function referencePopularPosts() {
  console.log("Searching...");
  var memesRef = db.collection("memes");
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

function test() {
  admin.database().ref("");
}

exports.scheduledFunction = functions.pubsub
  .schedule("every 1 minute")
  .onRun((context) => {
    console.log("This will be run every hour");
    referenceRecentPosts();
    referencePopularPosts();

    return null;
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
