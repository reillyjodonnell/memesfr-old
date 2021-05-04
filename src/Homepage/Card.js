import React, { useState } from "react";
import Meme from "../Assets/o3yck1fvhyw61.jpg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./CSS/Card.css";
import { ThumbDown } from "@material-ui/icons";

export default function Card() {
  const [like, setLike] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  const toggleThumbUp = () => {
    setThumbUp(!thumbUp);
    if (thumbDown == true) {
      setThumbDown(!thumbDown);
    }
  };
  const toggleThumbDown = () => {
    setThumbDown(!thumbDown);
    if (thumbUp == true) {
      setThumbUp(!thumbUp);
    }
  };

  return (
    <>
      <div className="card">
        <div className="upper">
          <span className="username">User Name</span>
          <img className="meme-image" src={Meme}></img>
          <span className="meme-title">Meme title</span>
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
          <svg
            onClick={toggleThumbUp}
            xmlns="http://www.w3.org/2000/svg"
            className={thumbUp ? "active-thumbup" : "inactive-thumbup"}
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
            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
          </svg>
          <svg
            onClick={toggleThumbDown}
            xmlns="http://www.w3.org/2000/svg"
            className={thumbDown ? "active-thumbdown" : "inactive-thumbdown "}
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
            <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="report"
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
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      </div>
    </>
  );
}
