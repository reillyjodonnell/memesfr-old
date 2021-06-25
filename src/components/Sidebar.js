import React, { useState, useEffect, useRef } from "react";
import HomeIcon from "@material-ui/icons/Home";
import TrendingIcon from "@material-ui/icons/TrendingUp";
import PeopleIcon from "@material-ui/icons/Whatshot";
import RecentIcon from "@material-ui/icons/AccessTime";
import RandomIcon from "@material-ui/icons/Casino";
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

import "../CSS Components/Sidebar.css";

export default function Sidebar(props) {
  const [activeNav, setActiveNav] = useState();
  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const dropdownRef = useRef(null);

  function calcHeight(el) {
    var height = el.offsetHeight + 20;
    setMenuHeight(height);
  }

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
          <div className="sidebar-user-section">
            <div className="sidebar-avatar-container">
              <img className="sidebar-avatar" src={props.avatar} />
            </div>

            <span className="sidebar-username">
              @{props.username && props.username}
            </span>
            <div onClick={props.createPost} className="sidebar-create-post">
              <span>Upload</span>
              <Plus />
            </div>
          </div>
        ) : null}
        <CSSTransition
          dropdownRef={dropdownRef}
          in={activeMenu === "main"}
          timeout={200}
          classNames="navigation-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="sidebar-navigation">
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
            <div className="navigation-group">
              {props.avatar !== undefined ? (
                <>
                  <Logout />
                  <span className="navigation-group-text">Logout</span>
                </>
              ) : (
                <>
                  <Logout />
                  <span className="navigation-group-text">
                    Sign in/ Sign up
                  </span>
                </>
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
          <div className="sidebar-navigation">
            <div className="sidebar-navigation-settings-header">
              <LeftArrow onClick={() => setActiveMenu("main")} />
              <span style={{ color: "white" }}>Settings</span>
            </div>

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
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
