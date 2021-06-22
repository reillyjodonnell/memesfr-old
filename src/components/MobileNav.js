import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import TrendingIcon from "@material-ui/icons/TrendingUp";
import PeopleIcon from "@material-ui/icons/Whatshot";
import RecentIcon from "@material-ui/icons/AccessTime";
import LayersIcon from "@material-ui/icons/Casino";
import { ReactComponent as Plus } from "../Assets/SVGs/plus.svg";
import "../CSS Components/MobileNav.css";

import { People } from "@material-ui/icons";

export default function MobileNav(props) {
  return (
    <div className="mobile-nav-container">
      <div onClick={props.homeFilter} className="mobile-nav-icon">
        <HomeIcon
          style={props.active === 0 ? { fill: "#00000085" } : { fill: "white" }}
        />
      </div>

      <div onClick={props.trendingFilter} className="mobile-nav-icon">
        <PeopleIcon
          style={props.active === 1 ? { fill: "#00000085" } : { fill: "white" }}
        />
      </div>

      <div onClick={props.createPost} className="mobile-nav-icon-primary">
        <Plus
          style={props.active === 2 ? { fill: "#00000085" } : { fill: "white" }}
        />
      </div>

      <div onClick={props.recentFilter} className="mobile-nav-icon">
        <RecentIcon
          style={props.active === 3 ? { fill: "#00000085" } : { fill: "white" }}
        />
      </div>

      <div onClick={props.randomFilter} className="mobile-nav-icon">
        <LayersIcon
          style={
            props.active === 4
              ? { strokeWidth: "2px", fill: "#00000085" }
              : { fill: "white" }
          }
        />
      </div>
    </div>
  );
}
