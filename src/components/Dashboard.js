import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from './Card';
import '../CSS Components/Dashboard.css';
import CreatePost from './CreatePost';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';
import firebase from 'firebase';
import { useAuth } from '../contexts/AuthContext';
import { useMobile } from '../contexts/MobileContext';
import { useNavigate } from 'react-router-dom';
import MobileNav from './MobileNav';
import PasswordModal from './PasswordModal';
import RightSidebar from './RightSidebar';
import Feed from './routes/home/Feed';
import { Outlet } from 'react-router-dom';
import Topbar from './TopBar';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: '#1098F7',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    fontSize: '2rem',
    cursor: 'pointer',
    marginRight: 'auto',
    overflow: 'visible',
  },
  drawerRoot: {
    position: 'sticky',
    left: 0,
  },
  drawerPaper: {
    top: '74px',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  loginregister: {
    marginLeft: 'auto',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    '@media (max-width: 650px)': {
      display: 'none',
    },
  },

  image: {
    marginRight: '1rem',
  },
  skeleton: {
    margin: '1rem',

    width: '35vw',
    minWidth: '300px',
    height: '35vh',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [popularPosts, setPopularPosts] = useState([{}]);
  const [recentPosts, setRecentPosts] = useState([{}]);
  const [randomPosts, setRandomPosts] = useState([{}]);
  const [activeScreen, setActiveScreen] = useState([{}]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [createPost, createPostFunction] = useState(false);
  const [loadAnotherRandomMeme, setLoadAnotherRandomMeme] = useState(false);
  const [resetPassword, resetPasswordFunction] = useState(false);
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [usersHeartedPosts, setUsersHeartedPosts] = useState([]);

  const [nav, setNav] = useState({ count: 0 });

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

  const navigate = useNavigate();

  let username;
  let avatar;

  if (currentUser) {
    username = currentUser.displayName;
    avatar = currentUser.photoURL;
  }

  const createMemePost = () => {
    createPostFunction(!createPost);
  };
  const resetUserPassword = () => {
    document.getElementById('root').style.filter = '';
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
  }, [nav, loadAnotherRandomMeme]);

  useEffect(() => {
    let mounted = true;

    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      const email = window.localStorage.getItem('emailForSignIn');
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
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            setCurrentUser(result.user);
            navigate('/setup');
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      return () => (mounted = false);
    }
  }, []);

  function filterHome() {
    if (nav !== 0) {
      setLoadingFilter(true);
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 0 });
      navigate('/');
    }
  }
  function filterTrending() {
    if (nav !== 1) {
      setLoadingFilter(true);
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 1 });
    }
  }

  function filterPopular() {
    if (nav !== 2) {
      setLoadingFilter(true);
      // myRef.current.scrollIntoView({ behavior: 'smooth' });

      setNav({ count: 2 });
    }
  }
  function filterRecent() {
    if (nav !== 3) {
      setLoadingFilter(true);
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 3 });
    }
  }
  function filterRandom() {
    setLoadingFilter(true);
    setNav({ count: 4 });
    setLoadAnotherRandomMeme((prevState) => !prevState);
  }

  const navigateToProfile = () => {
    setNav({ count: 4 });
    navigate(`/${currentUser.displayName}`);
  };
  const navigateToNotifications = () => {
    setNav({ count: 1 });
    navigate(`/notifications`);
  };
  const navigateToSettings = () => {
    setNav({ count: null });
    navigate('/settings');
  };
  const navigateToCoins = () => {
    setNav({ count: null });
    navigate('/coins');
  };
  const navigateToHelp = () => {
    setNav({ count: null });

    navigate('/help');
  };
  const navigateToMessage = () => {
    setNav({ count: null });

    navigate('/messages');
  };
  const navigateToWallet = () => {
    setNav({ count: null });

    navigate('/wallet');
  };

  const navigateToCreate = () => {
    setNav({ count: null });
    navigate('/create');
  };

  const ConfirmEmailPrompt = () => {
    return (
      <div
        style={{
          cursor: 'default',
          marginRight: 'auto',
          marginLeft: 'auto',
          display: 'flex',
          textAlign: 'center',
          height: '100%',
          justifyContent: 'center',
          color: 'black',
          flexDirection: 'column',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <span style={{ cursor: 'default', padding: '1rem' }}>
          Last step: confirm your email to be able to upload memes
        </span>
        <span
          onClick={() => sendAuthEmail(currentUser.email)}
          style={{ color: 'red', padding: '1rem' }}
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
    let sayingOne = '';
    let sayingTwo = '';
    if (recentlyUploaded.length === 1) {
      sayingTwo = "Here's what you just posted 👇";
    }
    if (recentlyUploaded.length > 1) {
      sayingOne = 'Keep it up memelord';
    }
    if (nav === 0 && recentlyUploaded.length > 0) {
      return (
        <>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              margin: '1rem',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                display: 'block',
                padding: '1rem',
                color: 'white',
                height: '100%',
                width: '100%',
              }}
            >
              <span style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>
                {sayingOne}
              </span>
              <br />
              <span style={{ whiteSpace: 'nowrap', fontSize: '1.2rem' }}>
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

  const notificationCount = 5;

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {isMobile ? (
          <>
            <MobileHeader activeUser={currentUser} />
            <MobileNav
              active={nav.count}
              homeFilter={filterHome}
              trendingFilter={filterTrending}
              recentFilter={filterRecent}
              popularFilter={filterPopular}
              randomFilter={filterRandom}
              createPost={createMemePost}
              resetPassword={resetUserPassword}
              navigateToCreate={navigateToCreate}
            />
          </>
        ) : (
          <>
            <Topbar
              homeFilter={filterHome}
              trendingFilter={filterTrending}
              recentFilter={filterRecent}
              popularFilter={filterPopular}
              randomFilter={filterRandom}
              navigateToProfile={navigateToProfile}
              navigateToNotifications={navigateToNotifications}
              navigateToCoins={navigateToCoins}
              navigateToHelp={navigateToHelp}
              navigateToSettings={navigateToSettings}
              navigateToMessage={navigateToMessage}
              navigateToWallet={navigateToWallet}
              navigateToCreate={navigateToCreate}
              createPost={createMemePost}
              active={nav.count}
              username={username}
              avatar={avatar}
              resetPassword={resetUserPassword}
            />
            <div
              style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
              }}
            >
              <Sidebar
                homeFilter={filterHome}
                trendingFilter={filterTrending}
                recentFilter={filterRecent}
                popularFilter={filterPopular}
                randomFilter={filterRandom}
                navigateToProfile={navigateToProfile}
                navigateToNotifications={navigateToNotifications}
                createPost={createMemePost}
                notificationCount={props.notificationCount}
                active={nav.count}
                username={username}
                avatar={avatar}
                resetPassword={resetUserPassword}
              />
              <Outlet />
            </div>
          </>
        )}

        {/* <main className={classes.content}>
          <Topbar createPost={createMemePost} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={5}></Grid>
            <Box spacing={5} pt={4}>
              <div ref={myRef}></div>

              {notConfirmedEmail ? <ConfirmEmailPrompt /> : null}

              <Feed
                nav={nav}
                loadingFilter={loadingFilter}
                usersLikedPosts={usersLikedPosts}
                activeScreen={activeScreen}
                resetUserPassword={resetUserPassword}
              /> 
            </Box>
          </Container>
        </main> */}

        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}
