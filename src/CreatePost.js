import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import RightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import doge from "./Assets/doge.svg";
import "./CSS Components/CreatePost.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Plus from "./Assets/Icons/Plus.svg";

import Modal from "./Modal";

const Categories = () => {
  const classes = useStyles();

  let age = 10;
  const handleChange = () => {
    console.log("Hello");
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={age}
        onChange={handleChange}
        label="Category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

const CrapIDontNeed = () => {
  const classes = useStyles();
  return (
    <Container className={classes.box}>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div className="avatar">
          <img src={doge} />
        </div>
        <form
          style={{ display: "flex" }}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="Title" />
        </form>

        <UploadButton />
        <DeleteButton />
        <SendButton />
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      width: "100px",
      display: "flex",
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
    display: "flex",
  },
  box: {
    display: "flex",
    margin: "1rem",
    border: "1px solid black",
    height: "4rem",
  },
}));
const DeleteButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      onClick={props.OpenFilePrompt}
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
};
const SendButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<RightIcon />}
    >
      Send
    </Button>
  );
};
const UploadButton = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
    >
      Upload
    </Button>
  );
};

export default function CreatePost() {
  const classes = useStyles();
  const [createPost, createPostFunction] = useState(false);

  const OpenFilePrompt = () => {
    createPostFunction(!createPost);
    console.log("Time to make your first post");
  };

  const CreateNewPost = () => {
    {
      if (createPost === true) {
        document.getElementById("root").style.filter = "blur(5px)";
      } else document.getElementById("root").style.filter = "blur(0px)";
    }
    return (
      <div className="create-post-preview">
        <div className="create-post-content">
          {createPost ? <Modal openFilePrompt={OpenFilePrompt} /> : null}
          <div className="avatar">
            <img src={doge} />
          </div>
          <div className="add-content">
            <div onClick={OpenFilePrompt} className="create-prompt">
              <span>Upload Dank Meme</span>
              <img className="plus" src={Plus} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CreateNewPost />
    </div>
  );
}
