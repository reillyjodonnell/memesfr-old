import React, { useState } from "react";
import { ReactComponent as Home } from "../Assets/Icons/Home.svg";
import { ReactComponent as Trending } from "../Assets/SVGs/trending.svg";
import { ReactComponent as Popular } from "../Assets/Icons/Popular.svg";
import { ReactComponent as Recent } from "../Assets/Icons/Recent.svg";
import { ReactComponent as Random } from "../Assets/Icons/Random.svg";
import { ReactComponent as Plus } from "../Assets/Icons/Plus.svg";

import "../CSS Components/MobileNav.css";

import { People } from "@material-ui/icons";

export default function MobileNav(props) {
  return (
    <div className="mobile-nav-container">
      <div onClick={props.homeFilter} className="mobile-nav-icon">
        <Home style={props.active === 0 ? { fill: "url(#grad)" } : null} />
      </div>

      <div onClick={props.trendingFilter} className="mobile-nav-icon">
        <Popular style={props.active === 1 ? { fill: "url(#grad)" } : null} />
      </div>

      <div onClick={props.createPost} className="mobile-nav-icon-primary">
        <Plus
          style={props.active === 2 ? { fill: "#00000085" } : { fill: "white" }}
        />
      </div>

      <div onClick={props.recentFilter} className="mobile-nav-icon">
        <Recent style={props.active === 3 ? { stroke: "url(#grad)" } : null} />
      </div>

      <div onClick={props.randomFilter} className="mobile-nav-icon">
        <Random style={props.active === 4 ? { fill: "url(#grad)" } : null} />
      </div>
    </div>
  );
}
