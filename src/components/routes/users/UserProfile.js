import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../../Card';
import '../../../CSS Components/Dashboard.css';
import CreatePost from '../../CreatePost';
import MobileHeader from '../../MobileHeader';
import Sidebar from '../../Sidebar';
import firebase from 'firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useMobile } from '../../../contexts/MobileContext';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import MobileNav from '../../MobileNav';
import PasswordModal from '../../PasswordModal';
import RightSidebar from '../../RightSidebar';
import Doge from '../../../Assets/doge.svg';
import '../../../CSS Components/UserProfile.css';
import { Skeleton } from '@material-ui/lab';
import { useTheme } from '../../../contexts/ThemeContext';

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
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

    width: '40vw',
    minWidth: '300px',
    height: '35vh',
  },
}));

export default function UserProfile(props) {
  let params = useParams();
  const { userId } = params;
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
  const [activeFilter, setActiveFilter] = useState(0);
  const [followsUser, setFollowsUser] = useState(true);
  const [nav, setNav] = useState(0);
  const [crownCount, setCrownCount] = useState(69);
  const [followers, setFollowers] = useState(0);
  const [memesCreated, setMemesCreated] = useState(0);
  const [userAge, setUserAge] = useState('');
  const [isUsersProfile, setIsUsersProfile] = useState(false);

  const myRef = useRef(null);

  const { isMobile } = useMobile();

  const { accentColor } = useTheme();

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
    retrieveProfileData,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    async function data() {
      const result = await profileData(userId);
      return result;
    }
    data().then((result) => {
      const { createdPosts, crowns, followers, avatar } = result;

      setCrownCount(crowns);
      setFollowers(followers.length);
      setMemesCreated(createdPosts.length);
    });
  }, []);

  //Retrieve the data from the user profile using the UID
  async function profileData(userId) {
    const data = await retrieveProfileData(userId);
    return data;
  }

  let username;
  let profileName;
  let avatar;

  useEffect(() => {
    if (username === profileName) {
      setIsUsersProfile(true);
    }
  }, [username, profileName]);

  if (currentUser) {
    username = currentUser.displayName;
    profileName = params.userId;
    avatar = currentUser.photoURL;
  }

  document.title = `Memesfr - ${username}`;

  let active = 0;

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
    // const memeDataPromise = await retrievePopularPosts();
    const memeDataPromise = [];
    if (memeDataPromise !== []) {
      const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
        return memeData;
      });
      return memeDataObject;
    } else return memeDataPromise;
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
    if (nav !== 0) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav(0);
    }
  }
  function filterTrending() {
    if (nav !== 1) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: 'smooth' });

      setNav(1);
    }
  }

  function filterPopular() {
    if (nav !== 2) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: 'smooth' });

      setNav(2);
    }
  }
  function filterRecent() {
    if (nav !== 3) {
      setLoadingFilter(true);
      myRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const MemePreview = ({ title }) => {
    return (
      <div className="meme-container">
        <img className="meme-image" src={Doge} />
        <span className="meme-title">{title}</span>
      </div>
    );
  };

  const getUserAge = () => {
    // plus sign is type conversion from string to int
    const creationDateInMilliSeconds = +currentUser.metadata.a;
    const creationDate = new Date(creationDateInMilliSeconds).toLocaleString(
      'en-GB',
      {
        timeZone: 'GMT',
      }
    );

    const timestamp = Math.round(Date.now());
    let todayDate = new Date(timestamp).toLocaleString('en-GB', {
      timeZone: 'GMT',
    });

    const yearCreation = creationDate.slice(6, 10);
    const monthCreation = creationDate.slice(3, 5);
    const dayCreation = creationDate.slice(0, 2);

    const yearToday = todayDate.slice(6, 10);
    const monthToday = todayDate.slice(3, 5);
    const dayToday = todayDate.slice(0, 2);

    const yearRemainder = yearToday - yearCreation;
    const monthRemainder = monthToday - monthCreation;
    const dayRemainder = dayToday - dayCreation;

    const userAge = {
      ageInYears: yearRemainder,
      ageInMonths: monthRemainder,
      ageInDays: dayRemainder,
    };
    return userAge;
  };

  const formatUserAge = () => {
    const { ageInYears, ageInDays, ageInMonths } = getUserAge();
    if (ageInYears === 0 && ageInMonths === 0) {
      return `${ageInDays} days 👶`;
    } else if (ageInYears === 0) {
      return `${ageInMonths} months 🧒`;
    } else return `${ageInYears} years ${ageInMonths} months 🧑`;
  };
  let userData = {};
  if (currentUser !== undefined) {
    // setUserAge(formatUserAge());
    userData = {
      age: formatUserAge(),
      totalCrowns: 69,
      followerCount: 420,
      memesPosted: 32,
    };
  }
  const toggleFollowUser = () => {
    setFollowsUser((prevState) => !prevState);
  };

  const hasTitle = true;

  const UserProfile = () => {
    return (
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-cover-photo"></div>
          <div>
            <div className="user-avatar-container">
              <img className="user-avatar" src={currentUser.photoURL} />
            </div>
          </div>

          <span className="user-username">{profileName}</span>
          {hasTitle && (
            <div className="title-container">
              <span>{'Meme Lord'}</span>
            </div>
          )}
          <div className="user-profile-stats">
            <div className="user-stat-group">
              <span className="user-follower-count">{followers}</span>
              <span className="user-stat-title">followers</span>
            </div>
            <div className="user-stat-group">
              <span className="user-crowns">{crownCount} </span>

              <span
                style={{
                  padding: '0px',
                  margin: '0px !important',
                  display: 'inline',
                }}
                className="user-stat-title"
              >
                crowns
              </span>
            </div>
            <div className="user-stat-group">
              <span className="user-bday">{memesCreated} </span>

              <span
                style={{
                  padding: '0px',
                  margin: '0px !important',
                  display: 'inline',
                }}
                className="user-stat-title"
              >
                memes
              </span>
            </div>
          </div>
          {isUsersProfile ? (
            <div className={'user-follow-button-container'}>
              <div
                onClick={toggleFollowUser}
                className={`${
                  followsUser
                    ? 'user-follow-button-active'
                    : 'user-follow-button'
                } ${
                  accentColor === 'green' && 'user-follow-button-active-alt'
                } `}
              >
                <span>Edit Profile </span>
              </div>
            </div>
          ) : (
            <div className="user-follow-button-container">
              <div
                onClick={toggleFollowUser}
                className={
                  followsUser
                    ? 'user-follow-button-active'
                    : 'user-follow-button'
                }
              >
                <span>{followsUser ? 'Following' : 'Follow'} </span>
              </div>
            </div>
          )}

          <div className="user-profile-content">
            <div
              className="user-profile-navigation-container"
              onClick={() => setActiveFilter(0)}
            >
              <span
                className={
                  activeFilter === 0
                    ? 'user-profile-post-header-active'
                    : 'user-profile-post-header'
                }
              >
                Posts
              </span>
            </div>
            <div
              className="user-profile-navigation-container"
              onClick={() => setActiveFilter(1)}
            >
              <span
                className={
                  activeFilter === 1
                    ? 'user-profile-post-header-active'
                    : 'user-profile-post-header'
                }
              >
                Activity
              </span>
            </div>
            <div
              className="user-profile-navigation-container"
              onClick={() => setActiveFilter(2)}
            >
              <span
                className={
                  activeFilter === 2
                    ? 'user-profile-post-header-active'
                    : 'user-profile-post-header'
                }
              >
                Crowned
              </span>
            </div>
          </div>
        </div>
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

  return (
    <div className="main-content">
      {currentUser !== undefined ? <UserProfile userId={userId} /> : null}
      <ShowSkeletons />
    </div>
  );
}
