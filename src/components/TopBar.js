import React from 'react';
import '../CSS Components/TopBar.css';
export default function TopBar(props) {
  return (
    <div className="topbar-content">
      <div onClick={props.createPost} className="topbar-button-content">
        <span className="add-dank-meme">Add dank meme</span>
      </div>
    </div>
  );
}
