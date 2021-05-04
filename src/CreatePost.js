import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  box: {
    margin: "1rem",
    border: "1px solid black",
    height: "4rem",
  },
}));
const DeleteButton = () => {
  const classes = useStyles();

  return (
    <Button
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
      startIcon={<Icon>send</Icon>}
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
  return (
    <div>
      <Container className={classes.box}>
        <div style={{ display: "flex" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Title" />
          </form>
          <UploadButton />
          <DeleteButton />
          <SendButton />
        </div>
      </Container>
    </div>
  );
}
