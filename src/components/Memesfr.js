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
                  <Route path="/" element={<Feed />} />
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
