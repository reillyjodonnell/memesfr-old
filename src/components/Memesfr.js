import React, { useState } from 'react';
import Login from './Login';
import Register from './SignUp';
import Home from './Home';
import AuthProvider from '../contexts/AuthContext';
import ThemeProvider from '../contexts/ThemeContext';
import MobileProvider from '../contexts/MobileContext';
import CreateProfile from './CreateProfile';
import Edit from './EditProfile';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import UserProfile from './routes/users/UserProfile';
import Notifications from './routes/notifications/Notifications';
import Feed from './routes/home/Feed';
import Settings from './routes/settings/Settings';
import Help from './routes/help/Help';
import Coins from './routes/coins/Coins';
import { useAuth } from '../contexts/AuthContext';
import Messages from './routes/messages/Messages';
import Wallet from './routes/wallet/Wallet';
import LanguageProvider from '../contexts/LanguageContext';
import Post from './routes/post/Post';

export default function Memesfr() {
  const [nav, setNav] = useState({ count: 0 });
  const [notificationCount, setNotificationCount] = useState(69);
  const [posts, setPosts] = useState({});

  document.title = 'Memesfr - Dankest Memes';

  return (
    <>
      <BrowserRouter>
        <MobileProvider>
          <LanguageProvider>
            <ThemeProvider>
              <AuthProvider>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        setPosts={setPosts}
                        notificationCount={notificationCount}
                      />
                    }
                  >
                    <Route
                      path="/"
                      element={<Feed postsData={posts} nav={nav} />}
                    />
                    <Route path=":userId" element={<UserProfile />}></Route>
                    <Route
                      path="/notifications"
                      element={
                        <Notifications notificationCount={notificationCount} />
                      }
                    />

                    <Route path="/settings" element={<Settings />} />
                    <Route path="/coins" element={<Coins />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/create" element={<Post />} />
                  </Route>
                  <Route path="/signup" element={<Register />} />
                  <Route path="/setup" element={<CreateProfile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/edit" element={<Edit />} />
                </Routes>
              </AuthProvider>
            </ThemeProvider>
          </LanguageProvider>
        </MobileProvider>
      </BrowserRouter>
    </>
  );
}
