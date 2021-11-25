import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../CSS Components/CreateProfile.css';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '48px',
  },
  orparent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  or: {
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& .MuiInputBase-root': {
      color: 'white',
      '&.Mui-focused': {
        color: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#bebebee3',
      },
    },

    '& .MuiFilledInput-underline:after': {
      borderBottom: '2px solid  #EA3788',
    },
  },
  username: {
    margin: 0,
    width: '100%',
    color: 'white !important',
  },
  button: {
    background: 'linear-gradient(350deg,  #EA3788, #00A7E1)',
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="memesfr.com/">
        Memesfr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function CreateProfile(props) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [availableMessage, setAvailableMessage] = useState('');
  const [error, setError] = useState(true);
  const [file, setFile] = useState();
  const inputFile = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUsernameAvailability, updateProfile } = useAuth();
  const [userName, setUserName] = useState('');

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/croppedDoge.jpg?alt=media&token=331b914f-da56-419d-8d28-d4188a15158c';

  const checkUserNameError = (e) => {
    setUserName(e.target.value);
    if (e.target.value.length < 5) {
      setAvailableMessage('');
      setError(true);
      setDisabled(true);
    } else if (e.target.value.length < 16) {
      checkUsernameAvailability(e.target.value).then((result) => {
        if (result === false) {
          setAvailableMessage('Username taken');
          setDisabled(true);
          setError(true);
        } else {
          setAvailableMessage('Username Available');
          const userNameToLowerCase = e.target.value.toLowerCase();
          setUserName(userNameToLowerCase);
          setError(false);
          setDisabled(false);
        }
      });
    }
    return userName;
  };

  function saveProfile() {
    if (!file) {
      updateProfile(userName, defaultAvatar, true);
    }
    if (file) {
      updateProfile(userName, file, false);
    }
  }

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const ImageThumb = ({ image }) => {
    if (image) {
      return <img src={URL.createObjectURL(image)} alt="" />;
    } else return <img alt="" src={defaultAvatar} />;
  };

  if (location.state) {
    if (location.state.verifiedUser) {
      return (
        <div className="create-profile-container">
          <div className="create-profile">
            <div
              className="sidebar-logo"
              style={{ padding: '2rem', justifyContent: 'center' }}
            >
              <Castle />
              <span style={{ color: 'white' }}>Memesfr</span>
            </div>

            <div className="username">
              <span className="username-prompt">Choose a username below</span>

              <form className={classes.root} autoComplete="off">
                <div>
                  <TextField
                    className={classes.username}
                    onChange={(e) => checkUserNameError(e)}
                    required
                    error={error}
                    id="filled-error-helper-text"
                    label="username"
                    defaultValue=""
                    helperText={availableMessage}
                    variant="filled"
                    inputProps={{
                      classes: {
                        focused: classes.focused,
                      },
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="profile-image-preview">
              <ImageThumb image={file} />
            </div>

            <div className="create-avatar" onClick={onButtonClick}>
              <button className="upload-button">
                <span>Change image</span>

                <input
                  onChange={handleUpload}
                  id="file"
                  ref={inputFile}
                  type="file"
                  style={{ display: 'none' }}
                />
              </button>
            </div>
            <div className="submit-profile">
              <Button
                disabled={disabled}
                onClick={saveProfile}
                variant="contained"
                className={disabled ? null : classes.button}
              >
                Save Profile
              </Button>
            </div>
          </div>

          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      );
    }
  } else {
    navigate('/');
    return null;
  }
}
