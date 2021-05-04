import { React, useState } from "react";
import { ReactComponent as Settings } from "../Assets/Icons/Assets/Settings.svg";
import { ReactComponent as Left } from "../Assets/Icons/Assets/ArrowLeftWhite.svg";
import "../CSS Components/index.css";
import "../CSS Components/DropDown.css";
import { ReactComponent as XmasTree } from "../Assets/Icons/Assets/ChristmasTree.svg";
import { ReactComponent as AddFriend } from "../Assets/Icons/Assets/UserPlus.svg";
import { ReactComponent as Friends } from "../Assets/Icons/Assets/Users.svg";
import plus from "../Assets/Icons/Assets/plus.svg";

export default function DropDownMenu() {
  const [open, openSettings] = useState(false);
  const [openFriends, manageFriends] = useState(false);
  const [openFile, expandFileSubmit] = useState(false);
  const [file, setFile] = useState(null);

  function DropDownItem(props) {
    return (
      <a href="#" style={props.style} className="menu-item">
        <span style={props.style} className="icon-button">
          {props.IconText}
          {props.Icon}{" "}
        </span>
        {props.children}
      </a>
    );
  }

  const ExpandFriends = () => {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <DropDownItem Icon={<AddFriend />} IconText="Add Friend" />

        <DropDownItem IconText="Friend List" />
        <DropDownItem IconText="Remove Friends" />
        <div onClick={() => manageFriends(!openFriends)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  };

  const UpdateProfilePicture = () => {
    const fileHandler = (e) => {
      setFile(e.target.files[0]);
    };
    const imageHandler = (e) => {
      const reader = new FileReader();
      setFile(e.target.files);
    };
    /*

    return (
      <>
      
        <Modal onClose={() => expandFileSubmit(!openFile)}>
          {file ? (
            <>
              <span style={{ margin: "20px", fontSize: "2rem" }}>
                Review Profile Picture
              </span>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={file ? URL.createObjectURL(file) : null}
                    style={{
                      marginTop: "2rem",
                      marginBottom: "2rem",
                      width: "200px",
                      height: "200px",
                    }}
                    alt=""
                  />
                </div>
                <button onClick={() => console.log("Image is saved")}>
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <span style={{ margin: "20px", fontSize: "2rem" }}>
                Upload Profile Picture
              </span>
              <div>
                <form>
                  <div
                    role="button"
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                      flexDirection: "row",
                      cursor: "pointer",
                      pointerEvents: "all",
                      height: "5rem",
                      backgroundColor: "#484a4d",
                    }}
                  >
                    <input
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        paddingTop: "100px",
                        cursor: "pointer",
                        width: "100%",
                        zIndex: 10,
                      }}
                      type="file"
                      name=""
                      id=""
                      onChange={fileHandler}
                    />
                    <div style={{ position: "absolute" }}>
                      <span
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifySelf: "space-evenly",
                          fontSize: "1.5rem",
                        }}
                      >
                        Upload Image
                      </span>
                      <img
                        src={plus}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          justifySelf: "space-evenly",
                          alignItems: "center",
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </Modal>
      </>
    );
     */
  };

  function SettingsOptions() {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <DropDownItem Icon={<XmasTree />} IconText="Activate Christmas" />

        <div onClick={() => expandFileSubmit(!openFile)}>
          <DropDownItem IconText="Change Profile Picture" />
        </div>
        <DropDownItem IconText="Change Password" />
        <div onClick={() => openSettings(!open)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  }
  function FirstOptions() {
    return (
      <>
        <div>
          <DropDownItem IconText="Sign Out" />
        </div>
        <div onClick={() => manageFriends(!openFriends)}>
          <DropDownItem Icon={<Friends />} IconText="Friends" />
        </div>
        <div onClick={() => openSettings(!open)}>
          <DropDownItem IconText="Settings" Icon={<Settings />}></DropDownItem>
        </div>
      </>
    );
  }

  return (
    <div className="dropdown">
      <div className="menu">
        {openFile ? (
          <UpdateProfilePicture />
        ) : null || open ? (
          <SettingsOptions />
        ) : openFriends ? (
          <ExpandFriends />
        ) : (
          <FirstOptions />
        )}
      </div>
    </div>
  );
}
