import React from "react";

export default function SectionHeader(props) {
  return (
    <div className="section-header-area">
      <div className="section-header-title">
        {props.nav === 0 ? (
          <span>Home</span>
        ) : props.nav === 1 ? (
          <span>Trending</span>
        ) : props.nav === 2 ? (
          <span>Popular</span>
        ) : props.nav === 3 ? (
          <span>Recent</span>
        ) : props.nav === 4 ? (
          <span>Random</span>
        ) : null}
      </div>
    </div>
  );
}
