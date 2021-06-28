import React, { useState, useRef } from "react";

export default function ModalTitle(props) {
  const titleRef = useRef();
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  const titleRegex = /(?=.*[!@#$%^&*])/;
  const checkTitleError = (e) => {
    props.setTitleError(false);

    if (e.target.value.match(titleRegex)) {
      props.setTitleError(true);
      setTitleErrorMessage("Can't have special characters'");
    }
    if (e.target.value == "") {
      props.setTitleError(true);
      setTitleErrorMessage("Cannot be empty");
    } else {
      setTitleErrorMessage("");
      props.setTitleError(false);
    }
  };

  return (
    <input
      id="input"
      className="upper-post-section-meme-title"
      autoFocus
      placeholder="Meme title"
      ref={titleRef}
      onChange={(e) => checkTitleError(e)}
      required
      maxLength="40"
      label="Title"
      autoComplete="off"
      helperText={titleErrorMessage}
      error={props.titleError}
    ></input>
  );
}
