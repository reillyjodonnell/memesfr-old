import React, { useState } from "react";
import ReactDom from "react-dom";

import X from "./Assets/Icons/X.svg";
import Image from "./Assets/Icons/Image.svg";
import Video from "./Assets/Icons/Video.svg";
import Gif from "./Assets/Icons/Gif.svg";
import Upload from "./Assets/Icons/CloudUpload.svg";

export default function Modal(props) {
  console.log(props);
  return ReactDom.createPortal(
    <div className="expanded-file">
      <div className="upper-section">
        <span>Upload Meme</span>
        <img onClick={props.openFilePrompt} src={X} />
      </div>
      <div className="upper-middle">
        <div className="group">
          <img src={Image}></img>
          <div className="details">
            <span className="title">Photos</span>
            <span className="description">PNG, JPG, GIF </span>
          </div>
        </div>
        <div className="group">
          <img src={Gif}></img>
          <div className="details">
            <span className="title">Gifs</span>
            <span className="description">800x600 or 400x300 </span>
          </div>
        </div>
        <div className="group">
          <img src={Video}></img>
          <div className="details">
            <span className="title">Videos</span>
            <span className="description">800x600 or 400x300 </span>
          </div>
        </div>
      </div>
      <div className="main-section">
        <img src={Upload}></img>
        <span>Drag Drop to upload or browse</span>
      </div>
      <div className="lower-section">
        <span>
          By clicking upload you agree to abide by our Community Policy.
        </span>
        <button>Upload</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
