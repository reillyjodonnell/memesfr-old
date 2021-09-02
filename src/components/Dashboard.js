import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "./Card";
import "../CSS Components/Dashboard.css";
import CreatePost from "./CreatePost";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";
import firebase from "firebase";
import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as X } from "../Assets/SVGs/x.svg";
import MobileNav from "./MobileNav";
import SectionHeader from "./SectionHeader";
import PasswordModal from "./PasswordModal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#1098F7",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    fontSize: "2rem",
    cursor: "pointer",
    marginRight: "auto",
    overflow: "visible",
  },
  drawerRoot: {
    position: "sticky",
    left: 0,
  },
  drawerPaper: {
    top: "74px",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100%",
    overflowX: "hidden",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  loginregister: {
    marginLeft: "auto",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
    "@media (max-width: 650px)": {
      display: "none",
    },
  },

  image: {
    marginRight: "1rem",
  },
  skeleton: {
    margin: "1rem",

    width: "40vw",
    minWidth: "300px",
    height: "35vh",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [popularPosts, setPopularPosts] = useState([{}]);
  const [recentPosts, setRecentPosts] = useState([{}]);
  const [randomPosts, setRandomPosts] = useState([{}]);
  const [activeScreen, setActiveScreen] = useState([{}]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [home, setHome] = useState(false);
  const [createPost, createPostFunction] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [displayFirstTimeMessage, setDisplayFirstTimeMessage] = useState(true);
  const [loadAnotherRandomMeme, setLoadAnotherRandomMeme] = useState(false);
  const [resetPassword, resetPasswordFunction] = useState(false);
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [usersHeartedPosts, setUsersHeartedPosts] = useState([]);

  const [nav, setNav] = useState(0);

  const myRef = useRef(null);

  const { isMobile } = useMobile();

  const {
    currentUser,
    retrievePopularPosts,
    retrieveRecentPosts,
    recentlyUploaded,
    retrieveRandomMeme,
    sendAuthEmail,
    hasUserLikedPost,
    setCurrentUser,
    notConfirmedEmail,
  } = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted === true) {
      setHome((prev) => !prev);
    }
    return () => (mounted = false);
  }, [recentlyUploaded]);

  const history = useHistory();

  if (currentUser) {
    var username = currentUser.displayName;
    var avatar = currentUser.photoURL;
  }

  var active = 0;

  const createMemePost = () => {
    createPostFunction(!createPost);
  };
  const resetUserPassword = () => {
    document.getElementById("root").style.filter = "";
    resetPasswordFunction(!resetPassword);
  };

  //Runs three times
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function match() {
        if (currentUser) {
          const results = await hasUserLikedPost();
          let [{ likedPosts }, { heartedPosts }] = results;
          setUsersLikedPosts(likedPosts);
          setUsersHeartedPosts(heartedPosts);
        }
      }
      match();
    }
    return () => {
      mounted = false;
    };
  }, [activeScreen]);

  useEffect(() => {
    let mounted = true;

    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
      }
      // The client SDK will parse the code from the link for you.
      if (mounted)
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            setCurrentUser(result.user);
            history.push({
              pathname: "/setup",
              state: {
                verifiedUser: result.user.emailVerified,
              },
            });
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      return () => (mounted = false);
    }
  }, []);

  useEffect(() => {
    let mount = true;
    let visited = localStorage.getItem("firstTime");
    if (mount) {
      if (visited) {
        setFirstTime(false);
      } else {
        setFirstTime(true);
        localStorage.setItem("firstTime", true);
      }
    }

    return () => {
      mount = false;
    };
  }, []);

  const ThanksForVisiting = () => {
    function closeMessage() {
      setDisplayFirstTimeMessage(false);
    }
    if (displayFirstTimeMessage) {
      return (
        <div className="thanks-box">
          <div className="close-thanks-box">
            <X onClick={closeMessage} />
          </div>

          <span className="thanks-title">
            Thanks so much for visiting this site ❤️
          </span>
          <div className="discord-invite">
            <span>
              Join our discord server and be a part of the Memefr community:
            </span>
            <Link> https://discord.gg/234DDJUQpD</Link>
          </div>

          <span>
            We have some awesome things planned for the future, including paying
            crypto for awesome memes (awesome, right?) This is a beta of the
            website, which will most likely include serious bugs. We've done
            tons of testing, but there's bound to be plenty of bugs. If you find
            any bugs/ have any suggestions for the site, join the Discord server
            and post them there!
          </span>
        </div>
      );
    }
    return null;
  };

  function showPopular() {
    setLoadingFilter(true);
    setActiveScreen();
    if (recentPosts) {
      setRecentPosts();
    }
    if (randomPosts) {
      setRandomPosts();
    }
    loadPopular().then((items) => {
      setPopularPosts(items);
      setActiveScreen(items);
      setLoadingFilter(false);
    });
  }

  async function loadPopular() {
    const memeDataPromise = await retrievePopularPosts();
    const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
      return memeData;
    });
    return memeDataObject;
  }
  async function loadRecent() {
    const memeDataPromise = await retrieveRecentPosts();
    const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
      return memeData;
    });
    return memeDataObject;
  }

  function showRecent() {
    setActiveScreen();
    if (popularPosts) {
      setPopularPosts();
    }
    if (randomPosts) {
      setRandomPosts();
    }
    loadRecent().then((items) => {
      setRecentPosts(items);
      setActiveScreen(items);
      setLoadingFilter(false);
    });
  }
  async function loadRandom() {
    const memeDataPromise = await retrieveRandomMeme();
    return memeDataPromise;
  }

  function showRandom() {
    setLoadingFilter(true);

    setActiveScreen();
    if (popularPosts) {
      setPopularPosts();
    }
    if (recentPosts) {
      setRecentPosts();
    }

    loadRandom().then((items) => {
      setRandomPosts(items);
      setActiveScreen([items]);
      setLoadingFilter(false);
    });
  }

  function filterHome() {
    if (nav != 0) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: "smooth" });
      setNav(0);
    }
  }
  function filterTrending() {
    if (nav != 1) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: "smooth" });

      setNav(1);
    }
  }

  function filterPopular() {
    if (nav != 2) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: "smooth" });

      setNav(2);
    }
  }
  function filterRecent() {
    if (nav != 3) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: "smooth" });
      setNav(3);
    }
  }
  function filterRandom() {
    setLoadingFilter(true);
    setNav(4);
    setLoadAnotherRandomMeme((prevState) => !prevState);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted === true) {
      switch (nav) {
        case 0:
          showPopular();
          active = 0;
          break;
        case 1:
          showPopular();
          active = 1;
          break;
        case 2:
          showPopular();
          active = 2;
          break;
        case 3:
          showRecent();
          active = 3;
          break;
        case 4:
          showRandom();
          active = 4;
          break;
        default:
          active = 0;
      }
    }
    return () => (mounted = false);
  }, [nav, loadAnotherRandomMeme]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const ConfirmEmailPrompt = () => {
    return (
      <div
        style={{
          cursor: "default",
          marginRight: "auto",
          marginLeft: "auto",
          display: "flex",
          textAlign: "center",
          height: "100%",
          justifyContent: "center",
          color: "black",
          flexDirection: "column",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <span style={{ cursor: "default", padding: "1rem" }}>
          Last step: confirm your email to be able to upload memes
        </span>
        <span
          onClick={() => sendAuthEmail(currentUser.email)}
          style={{ color: "red", padding: "1rem" }}
        >
          Didn't get it? Resend
        </span>
      </div>
    );
  };

  const ShowSkeletons = () => {
    return (
      <>
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
        <Skeleton className={classes.skeleton} variant="rect" />
      </>
    );
  };

  const RecentlyPosted = () => {
    var sayingOne = "";
    var sayingTwo = "";
    if (recentlyUploaded.length === 1) {
      var sayingTwo = "Here's what you just posted 👇";
    }
    if (recentlyUploaded.length > 1) {
      sayingOne = "Keep it up memelord";
    }
    if (nav === 0 && recentlyUploaded.length > 0) {
      return (
        <>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              margin: "1rem",
            }}
          >
            <div
              style={{
                textAlign: "center",
                display: "block",
                padding: "1rem",
                color: "white",
                height: "100%",
                width: "100%",
              }}
            >
              <span style={{ whiteSpace: "pre-wrap", fontSize: "1.2rem" }}>
                {sayingOne}
              </span>
              <br />
              <span style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}>
                {sayingTwo}
              </span>
            </div>
          </div>
          {recentlyUploaded.map((item) => {
            return <Card key={item.id} item={item}></Card>;
          })}
        </>
      );
    }
    return null;
  };
  if (activeScreen != null) {
  }
  return (
    <div className="dashboard-content">
      {isMobile ? (
        <>
          <MobileHeader activeUser={currentUser} />
          <MobileNav
            active={nav}
            homeFilter={filterHome}
            trendingFilter={filterTrending}
            recentFilter={filterRecent}
            popularFilter={filterPopular}
            randomFilter={filterRandom}
            createPost={createMemePost}
            resetPassword={resetUserPassword}
          />
        </>
      ) : (
        <Sidebar
          homeFilter={filterHome}
          trendingFilter={filterTrending}
          recentFilter={filterRecent}
          popularFilter={filterPopular}
          randomFilter={filterRandom}
          createPost={createMemePost}
          active={nav}
          username={username}
          avatar={avatar}
          resetPassword={resetUserPassword}
        />
      )}

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={5}></Grid>
          <Box spacing={5} pt={4}>
            <div ref={myRef}></div>

            {notConfirmedEmail ? <ConfirmEmailPrompt /> : null}
            <div className="main-content">
              {loadingFilter && <ShowSkeletons />}
              <RecentlyPosted />
              {activeScreen
                ? activeScreen.length != undefined &&
                  activeScreen.map((item) => {
                    var liked = false;
                    var hearted = false;
                    if (usersLikedPosts.includes(item.id)) {
                      liked = true;
                    }
                    if (usersHeartedPosts.includes(item.id)) {
                      hearted = true;
                    }
                    return (
                      <Card
                        hearted={hearted}
                        liked={liked}
                        key={item.id}
                        likedPosts={usersLikedPosts}
                        heartedPosts={usersHeartedPosts}
                        item={item}
                      ></Card>
                    );
                  })
                : null}
              {createPost ? (
                <CreatePost
                  createPostFunction={createPostFunction}
                  createPost={createPost}
                />
              ) : null}
              {resetPassword ? (
                <PasswordModal
                  resetPassword={resetPassword}
                  closePrompt={resetUserPassword}
                />
              ) : null}
              {!loadingFilter && nav != 4 && (
                <div className="end-of-memes">
                  <span>End of the memes 😢</span>
                </div>
              )}
            </div>
          </Box>
        </Container>
      </main>
    </div>
  );
}
