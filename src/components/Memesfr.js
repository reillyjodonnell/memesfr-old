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
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import UserProfile from './routes/users/UserProfile';
import Notifications from './routes/notifications/Notifications';
import Feed from './routes/home/Feed';
import { useAuth } from '../contexts/AuthContext';

export default function Memesfr() {
  const [nav, setNav] = useState({ count: 0 });

  return (
    <>
      <BrowserRouter>
        <MobileProvider>
          <ThemeProvider>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Home />}>
                  <Route path="/" element={<Feed nav={nav} />}></Route>
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
