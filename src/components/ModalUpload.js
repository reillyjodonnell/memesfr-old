import React from "react";

export default function ModalUpload(props) {
  return (
    <button
      className={
        titleError ? "modal-upload-button-disabled" : "modal-upload-button"
      }
      type="submit"
      disabled={titleError}
      onClick={props.onButtonClick}
    >
      <input
        type="submit"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
      />
      Upload
    </button>
  );
}
