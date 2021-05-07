import { React, useState } from "react";
import { ReactComponent as Settings } from "../Assets/Icons/Assets/Settings.svg";
import { ReactComponent as Left } from "../Assets/Icons/Assets/ArrowLeftWhite.svg";
import "../CSS Components/DropDownMenu.css";
import { ReactComponent as XmasTree } from "../Assets/Icons/Assets/ChristmasTree.svg";
import { ReactComponent as AddFriend } from "../Assets/Icons/Assets/UserPlus.svg";
import { ReactComponent as Friends } from "../Assets/Icons/Assets/Users.svg";
import { ReactComponent as Doge } from "../Assets/doge.svg";
import { ReactComponent as Help } from "../Assets/Icons/Help.svg";
import plus from "../Assets/Icons/Assets/plus.svg";

export default function DropDownMenu(props) {
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
  };

  function SecondaryOptions() {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <DropDownItem Icon={<Doge />} IconText="Activate Doge" />

        <div onClick={() => expandFileSubmit(!openFile)}>
          <DropDownItem IconText="This button is worthless" />
        </div>
        <DropDownItem IconText="Like me" />
        <div onClick={() => openSettings(!open)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  }

  function UserSecondaryOptions() {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <DropDownItem Icon={<Doge />} IconText="Activate Doge" />

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
  function PrimaryOptions() {
    return (
      <>
        <div onClick={() => manageFriends(!openFriends)}>
          <DropDownItem Icon={<Help />} IconText="Help" />
        </div>
        <div onClick={() => openSettings(!open)}>
          <DropDownItem IconText="Settings" Icon={<Settings />}></DropDownItem>
        </div>
        <div>
          <DropDownItem IconText="Log In / Sign Up" />
        </div>
      </>
    );
  }
  function UserPrimaryOptions() {
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
          <SecondaryOptions />
        ) : openFriends ? (
          <ExpandFriends />
        ) : (
          <PrimaryOptions />
        )}
      </div>
    </div>
  );
}
