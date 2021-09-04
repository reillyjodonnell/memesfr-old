import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Settings } from "../Assets/SVGs/settings.svg";
import { ReactComponent as Logout } from "../Assets/SVGs/logout.svg";
import { ReactComponent as Castle } from "../Assets/SVGs/castle.svg";
import { ReactComponent as Home } from "../Assets/Icons/Home.svg";
import { ReactComponent as Trending } from "../Assets/SVGs/trending.svg";
import { ReactComponent as Popular } from "../Assets/Icons/Popular.svg";
import { ReactComponent as Recent } from "../Assets/Icons/Recent.svg";
import { ReactComponent as Random } from "../Assets/Icons/Random.svg";
import { ReactComponent as Plus } from "../Assets/Icons/Plus.svg";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as LeftArrow } from "../Assets/SVGs/arrowLeft.svg";
import { ReactComponent as Doge } from "../Assets/doge.svg";
import { ReactComponent as Help } from "../Assets/SVGs/help.svg";
import { ReactComponent as Ball } from "../Assets/SVGs/pokeBall.svg";
import { ReactComponent as Discord } from "../Assets/SVGs/discordLogo.svg";
import { ReactComponent as ProfilePic } from "../Assets/SVGs/photo.svg";
import { ReactComponent as Password } from "../Assets/SVGs/lock.svg";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useHistory } from "react-router";
import { useMobile } from "../contexts/MobileContext";
import "../CSS Components/Sidebar.css";

export default function Sidebar(props) {
  const [activeNav, setActiveNav] = useState();
  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [doge, setDoge] = useState(false);
  const { updateDoge } = useTheme();
  const dropdownRef = useRef(null);
  const history = useHistory();
  const { signOut, currentUser } = useAuth();

  const UploadButton = () => {
    return (
      <div onClick={props.createPost} className="sidebar-create-post">
        <span>Upload</span>
        <Plus />
      </div>
    );
  };

  const UserActivityInformation = () => {
    return (
      <div className="user-activity-information-container">
        <div className="user-activity-information-modules">
          <span className="user-activity-information-category">Memes</span>
          <span className="user-activity-information-number">0</span>
        </div>
        <div className="user-activity-information-modules">
          <span className="user-activity-information-category">Followers</span>
          <span className="user-activity-information-number">0</span>
        </div>
        <div className="user-activity-information-modules">
          <span className="user-activity-information-category">Following</span>
          <span className="user-activity-information-number">0</span>
        </div>
      </div>
    );
  };

  function activateDoge() {
    updateDoge();
    setDoge((prev) => !prev);
  }

  function calcHeight(el) {
    var height = el.offsetHeight + 20;
    setMenuHeight(height);
  }
  function goToLogin() {
    history.push("/login");
  }
  const Help = () => {
    <div onClick={() => history.push("/help")} className={"navigation-group"}>
      <div className="navigation-group-items navigation-settings-icon">
        <Help />
        <span className="navigation-group-text">Help</span>
      </div>
    </div>;
  };

  const discLink = "https://discord.gg/234DDJUQpD";

  function selectOption() {
    setActive((prevState) => !prevState);
  }
  return (
    <div className="sidebar-fixed">
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <Castle />
          <span>Memesfr</span>
        </div>
        {props.avatar !== undefined ? (
          <>
            <div className="sidebar-user-section">
              <div className="sidebar-avatar-container">
                <img className="sidebar-avatar" src={props.avatar} />
              </div>

              <span className="sidebar-username">
                @{props.username && props.username}
              </span>
            </div>

            <UserActivityInformation />
          </>
        ) : null}
        <div className="sidebar-navigation">
          <CSSTransition
            in={activeMenu === "main"}
            timeout={200}
            classNames="navigation-primary"
            unmountOnExit
            onEnter={calcHeight}
            dropdownRef={dropdownRef}
          >
            <div>
              <div
                onClick={props.homeFilter}
                className={
                  props.active === 0
                    ? "navigation-group navigation-group-active"
                    : "navigation-group"
                }
              >
                <div className="navigation-group-items">
                  <Home
                    style={props.active === 0 ? { fill: "url(#grad)" } : null}
                  />
                  <span className="navigation-group-text">Home</span>
                </div>
              </div>
              <div
                onClick={props.trendingFilter}
                className={
                  props.active === 1
                    ? "navigation-group navigation-group-active"
                    : "navigation-group"
                }
              >
                <Trending
                  style={props.active === 1 ? { fill: "url(#grad)" } : null}
                />
                <span className="navigation-group-text">Trending</span>
              </div>
              <div
                onClick={props.popularFilter}
                className={
                  props.active === 2
                    ? "navigation-group navigation-group-active"
                    : "navigation-group"
                }
              >
                <Popular
                  style={props.active === 2 ? { fill: "url(#grad)" } : null}
                />
                <span className="navigation-group-text">Popular</span>
              </div>
              <div
                onClick={props.recentFilter}
                className={
                  props.active === 3
                    ? "navigation-group navigation-group-active"
                    : "navigation-group"
                }
              >
                <Recent
                  style={props.active === 3 ? { stroke: "url(#grad)" } : null}
                />
                <span className="navigation-group-text">Recent</span>
              </div>
              <div
                onClick={props.randomFilter}
                className={
                  props.active === 4
                    ? "navigation-group navigation-group-active"
                    : "navigation-group"
                }
              >
                <Random
                  style={props.active === 4 ? { fill: "url(#grad)" } : null}
                />
                <span className="navigation-group-text">Random</span>
              </div>
              <div
                onClick={() => setActiveMenu("settings")}
                className="navigation-group"
              >
                <Settings style={active ? { stroke: "url(#grad)" } : null} />
                <span className="navigation-group-text">Settings</span>
              </div>
              <div className="sidebar-login ">
                {props.avatar !== undefined ? (
                  <div className="logout-container" onClick={signOut}>
                    <Logout />
                    <span className="navigation-group-text">Logout</span>
                  </div>
                ) : (
                  <div onClick={goToLogin} className={"navigation-group"}>
                    <Logout />
                    <span className="navigation-group-text">
                      Sign in/ Sign up
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "settings"}
            timeout={200}
            classNames="navigation-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div>
              <div
                onClick={() => setActiveMenu("main")}
                className="sidebar-navigation-settings-header"
              >
                <LeftArrow />
                <span style={{ color: "white" }}>Settings</span>
              </div>

              <div onClick={activateDoge} className={"navigation-group"}>
                <div className="navigation-group-items navigation-settings-icon">
                  <Doge
                    style={props.active === 0 ? { fill: "url(#grad)" } : null}
                  />
                  <span className="navigation-group-text">
                    {doge ? "Deactivate Doge" : "Activate Doge"}
                  </span>
                </div>
              </div>
              <div className={"navigation-group"}>
                <a target="_blank" href={discLink}>
                  <div className="navigation-group-items navigation-settings-icon">
                    <Discord />
                    <span className="navigation-group-text">
                      Discord Server
                    </span>
                  </div>
                </a>
              </div>
              {currentUser ? (
                <>
                  <div className={"navigation-group"}>
                    <div
                      onClick={props.resetPassword}
                      className="navigation-group-items navigation-settings-icon"
                    >
                      <Password />
                      <span className="navigation-group-text">
                        Change Password
                      </span>
                    </div>
                  </div>

                  <div onClick={signOut} className={"navigation-group"}>
                    <div className="navigation-group-items navigation-settings-icon">
                      <Logout />
                      <span className="navigation-group-text">Sign Out</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}
