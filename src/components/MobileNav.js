import React, { useState } from 'react';
import { ReactComponent as Home } from '../Assets/Icons/Home.svg';
import { ReactComponent as Notification } from '../Assets/Icons/Notifications.svg';

import { ReactComponent as Popular } from '../Assets/Icons/Popular.svg';
import { ReactComponent as Recent } from '../Assets/Icons/Recent.svg';
import { ReactComponent as Random } from '../Assets/Icons/Random.svg';
import { ReactComponent as User } from '../Assets/SVGs/user.svg';

import { ReactComponent as Plus } from '../Assets/Icons/Plus.svg';
import { useAuth } from '../contexts/AuthContext';

import '../CSS Components/MobileNav.css';

import {
  Message,
  Settings,
  AccountBalanceWalletRounded,
} from '@material-ui/icons';

import { People } from '@material-ui/icons';
export default function MobileNav(props) {
  const { currentUser } = useAuth();

  return (
    <div className="mobile-nav-container">
      <div onClick={props.homeFilter} className="mobile-nav-icon">
        <Home
          style={
            props.active === 0
              ? {
                  fill: 'var(--primary-accent)',
                  stroke: 'var(--primary-accent)',
                }
              : null
          }
        />
      </div>
      <div onClick={props.trendingFilter} className="mobile-nav-icon">
        <Notification
          style={
            props.active === 1 ? { stroke: 'var(--primary-accent)' } : null
          }
        ></Notification>
      </div>
      <div onClick={props.createPost} className="mobile-nav-icon-primary">
        <Plus
          style={props.active === 2 ? { fill: '#00000085' } : { fill: 'white' }}
        />
      </div>

      <div onClick={props.recentFilter} className="mobile-nav-icon">
        <Message
          className="message-icon"
          style={
            props.active === 1 ? { stroke: 'var(--primary-accent)' } : null
          }
        />
      </div>
      <div className="mobile-nav-icon">
        <User />
      </div>
    </div>
  );
}
