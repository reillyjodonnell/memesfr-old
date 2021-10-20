import React from 'react';

export default function SectionHeader(props) {
  console.log('Hi');
  return (
    <div data-testid="section-1" className="section-header-area">
      <div data-testid="section-2" className="section-header-title">
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
