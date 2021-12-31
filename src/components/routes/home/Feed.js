import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '../../Card';
import '../../../CSS Components/Dashboard.css';
import CreatePost from '../../CreatePost';
import { useAuth } from '../../../contexts/AuthContext';
import { useMobile } from '../../../contexts/MobileContext';
import PasswordModal from '../../PasswordModal';

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

export default function Feed(props) {
  const classes = useStyles();
  const [resetPassword, resetPasswordFunction] = useState(false);
  const [register, openRegister] = useState(false);
  const [signIn, openSignIn] = useState(false);
  const [home, displayHome] = useState(true);
  const [popularPosts, setPopularPosts] = useState([{}]);
  const [recentPosts, setRecentPosts] = useState([{}]);
  const [randomPosts, setRandomPosts] = useState([{}]);
  const [activeScreen, setActiveScreen] = useState([{}]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [createPost, createPostFunction] = useState(false);
  const [loadAnotherRandomMeme, setLoadAnotherRandomMeme] = useState(false);
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [usersHeartedPosts, setUsersHeartedPosts] = useState([]);
  const [isMuted, setIsMuted] = useState(true);

  const [nav, setNav] = useState(0);

  const myRef = useRef(null);

  useEffect(() => {
    showPopular();
  }, []);

  document.title = '🏠 Memesfr - Dankest Memes';

  const {
    currentUser,
    hasUserLikedPost,
    retrievePopularPosts,
    retrieveRecentPosts,
    retrieveRandomMeme,
  } = useAuth();

  const resetUserPassword = () => {
    document.getElementById('root').style.filter = '';
    resetPasswordFunction(!resetPassword);
  };

  useEffect(() => {
    if (props.postsData.length === undefined) {
      setLoadingFilter(true);
    } else {
      setPopularPosts(props.postsData);
      setLoadingFilter(false);
    }
  }, [props.postsData]);

  function showPopular() {
    setLoadingFilter(true);
    setActiveScreen();
    if (recentPosts) {
      setRecentPosts();
    }
    if (randomPosts) {
      setRandomPosts();
    }
    // setActiveScreen(props.postsData);
  }

  // async function loadPopular() {
  //   const memeDataPromise = await retrievePopularPosts();
  //   if (memeDataPromise !== []) {
  //     const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
  //       return memeData;
  //     });
  //     return memeDataObject;
  //   } else return memeDataPromise;
  // }
  async function loadRecent() {
    const memeDataPromise = await retrieveRecentPosts();
    const memeDataObject = Promise.all(memeDataPromise).then((memeData) => {
      return memeData;
    });
    return memeDataObject;
  }

  // function showRecent() {
  //   setActiveScreen();
  //   if (popularPosts) {
  //     setPopularPosts();
  //   }
  //   if (randomPosts) {
  //     setRandomPosts();
  //   }
  //   loadRecent().then((items) => {
  //     setRecentPosts(items);
  //     setActiveScreen(items);
  //     setLoadingFilter(false);
  //   });
  // }
  // async function loadRandom() {
  //   const memeDataPromise = await retrieveRandomMeme();
  //   return memeDataPromise;
  // }

  // function showRandom() {
  //   setLoadingFilter(true);

  //   setActiveScreen();
  //   if (popularPosts) {
  //     setPopularPosts();
  //   }
  //   if (recentPosts) {
  //     setRecentPosts();
  //   }

  //   loadRandom().then((items) => {
  //     setRandomPosts(items);
  //     setActiveScreen([items]);
  //     setLoadingFilter(false);
  //   });
  // }

  function filterHome() {
    if (nav !== 0) {
      setLoadingFilter(true);
      // myRef.current.scrollIntoView({ behavior: 'smooth' });
      setNav({ count: 0 });
      //navigate('/');
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

  const updateRegister = () => {
    displayHome(!home);
    openRegister(!register);
  };
  const updateSignIn = () => {
    displayHome(!home);
    openSignIn(!signIn);
  };

  const { isMobile } = useMobile();

  const { recentlyUploaded } = useAuth();

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

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
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
            return (
              <Card
                key={item.id}
                toggleMuted={toggleMute}
                isMuted={isMuted}
                item={item}
              ></Card>
            );
          })}
        </>
      );
    }
    return null;
  };

  return (
    <div className="main-content">
      {loadingFilter ? (
        <ShowSkeletons />
      ) : !loadingFilter && popularPosts ? (
        popularPosts.length !== undefined &&
        popularPosts.map((item, index) => {
          let liked = false;
          let hearted = false;
          if (usersLikedPosts.includes(item.id)) {
            liked = true;
          }
          return (
            <Card
              hearted={hearted}
              liked={liked}
              key={index}
              toggleMute={toggleMute}
              isMuted={isMuted}
              likedPosts={usersLikedPosts}
              item={item}
            ></Card>
          );
        })
      ) : null}

      <RecentlyPosted />

      {!loadingFilter && nav !== 4 && (
        <div className="end-of-memes">
          <span>End of the memes 😢</span>
        </div>
      )}
    </div>
  );
}
