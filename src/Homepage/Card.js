import React, { useState } from "react";
import Meme from "../Assets/o3yck1fvhyw61.jpg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./CSS/Card.css";
import Message from "../Assets/Icons/Message.svg";
import Report from "../Assets/Icons/Report.svg";

export default function Card() {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };
  return (
    <>
      <div className="card">
        <div className="upper">
          <span className="username">User Name</span>
          <img className="meme-image" src={Meme}></img>
          <span>Meme title</span>
        </div>

        <div className="lower">
          <svg
            onClick={toggleLike}
            xmlns="http://www.w3.org/2000/svg"
            className={like ? "active-heart" : "inactive-heart"}
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
          <img className="message" src={Message} />
          <img className="report" src={Report} />
        </div>
      </div>
    </>
  );
}
