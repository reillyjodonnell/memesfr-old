import React, { useState } from 'react';
import Login from './Login';
import Register from './SignUp';
import Home from './Home';
import AuthProvider from '../contexts/AuthContext';
import ThemeProvider from '../contexts/ThemeContext';
import MobileProvider from '../contexts/MobileContext';
import CreateProfile from './CreateProfile';
import Help from './Help';
import Edit from './EditProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './routes/users/UserProfile';
import Notifications from './routes/notifications/Notifications';
import Feed from './routes/home/Feed';

export default function Memesfr() {
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
  const [resetPassword, resetPasswordFunction] = useState(false);
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [usersHeartedPosts, setUsersHeartedPosts] = useState([]);

  const [nav, setNav] = useStatce({ count: 0 });

  const resetUserPassword = () => {
    document.getElementById('root').style.filter = '';
    resetPasswordFunction(!resetPassword);
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
    console.log('setaAv(4)');
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

  return (
    <>
      <BrowserRouter>
        <MobileProvider>
          <ThemeProvider>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Home />}>
                  <Route
                    path="/"
                    element={
                      <Feed
                        nav={nav}
                        loadingFilter={loadingFilter}
                        usersLikedPosts={usersLikedPosts}
                        activeScreen={activeScreen}
                        resetUserPassword={resetUserPassword}
                      />
                    }
                  />
                  <Route path=":userId" element={<UserProfile />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>
                <Route path="/signup" element={<Register />} />
                <Route path="/setup" element={<CreateProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/help" element={<Help />} />
                <Route path="/edit" element={<Edit />} />
              </Routes>
            </AuthProvider>
          </ThemeProvider>
        </MobileProvider>
      </BrowserRouter>
    </>
  );
}
