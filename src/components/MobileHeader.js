import React from 'react';
import '../CSS Components/MobileHeader.css';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import { ReactComponent as User } from '../Assets/SVGs/user.svg';
import DropDownMenu from './DropDownMenu';
import NavbarItem from './NavbarItem';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as Hamburger } from '../Assets/Icons/Hamburger.svg';

export default function MobileHeader(props) {
  const { currentUser } = useAuth();
  return (
    <div>
      <header className="navbar-container">
        <div className="navbar-hamburger">
          <Hamburger />
        </div>
        <div className="navbar-content">
          <div className="navbar-logo">
            <Castle />
            {/* <span>Memesfr</span> */}
          </div>
          {/* <div className="navbar-avatar">
            <NavbarItem
              icon={
                currentUser ? (
                  <div className="avatar">
                    <img src={currentUser.photoURL} />
                  </div>
                ) : (
                  <User />
                )
              }
            >
              <DropDownMenu activeUser={currentUser} />
            </NavbarItem>
          </div> */}
        </div>
      </header>
    </div>
  );
}
