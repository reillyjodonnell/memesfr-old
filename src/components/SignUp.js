import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

function Copyright() {
  return (
    <>
      <Typography
        variant="body2"
        style={{ color: 'white', marginTop: '5rem', cursor: 'pointer' }}
        color="textSecondary"
        align="center"
      >
        {'Copyright © '}
        <Link color="inherit" href="https://memesfr.com/">
          Memesfr
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'white',
          backgroundColor: '#e3e3e34a',
          color: 'black',
        },
        '&:hover $notchedOutline': {
          borderColor: 'white',
        },
        '&$focused $notchedOutline': {
          borderColor: 'white',
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: '#272932',
    },

    '& label.Mui-focused': {
      color: 'white',
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '48px',
    background: 'linear-gradient(350deg,  #EA3788, #00A7E1)',
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
  textfield: {
    color: 'white',
    '& $notchedOutline': {
      //add this nested selector
      borderColor: 'red',
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, signedInFunction] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const [showPassword, showPasswordFunction] = useState(false);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const { signup, sendAuthEmail } = useAuth();

  const [userCreation, setUserCreation] = useState(false);
  //when the user becomes active, that means the email and pass is valid,
  //This useEffect will only execute once, when the userCreation is true

  async function handleSubmit(e) {
    e.preventDefault();
    setUserCreation(false);
    setLoading(true);

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    try {
      setError('');
      await signup(email, password)
        .then((err) => {
          console.log(err);
          if (!err) {
            window.alert('Success');
            setUserCreation(true);
          }
          if (err) {
            setError('Email is already in use');
            setEmailError(true);
          }
        })
        .catch((err) => {});

      setLoading(false);
    } catch {}
    return;
  }

  const emailRegEx =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const passwordRegEx = /^(?=.*[a-zA-z])(?=.*\d).{8,}$/;

  const checkEmailError = (e) => {
    setError(false);
    setEmail(e.target.value);
    if (e.target.value.match(emailRegEx)) {
      setEmailErrorMessage('');
      setEmailError(false);
      setLoading(false);
    } else {
      setEmailErrorMessage('Invalid');
      setEmailError(true);
    }
  };
  const checkPasswordError = (e) => {
    setPassword(e.target.value);
    if (e.target.value.match(passwordRegEx)) {
      setPasswordErrorMessage('');
      setPasswordError(false);
    } else {
      setPasswordErrorMessage(
        'Invalid password. Must be at least 8 characters, one letter and one number'
      );
      setPasswordError(true);
    }
  };
  function enablePassword() {
    showPasswordFunction(!showPassword);
  }
  function redirectToLogin() {
    history.push('/login');
  }

  const ConfirmEmailAddress = () => {
    return (
      <>
        <span style={{ padding: '1rem' }}>
          Check your inbox to confirm it's you
        </span>
        <span style={{ padding: '1rem' }}>
          Already clicked the link? Refresh the page
        </span>
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Didn't get it?
        </span>
      </>
    );
  };

  //When a user submits an email we need to check two things:
  // 1. Is that email already in use?
  // 2. If not, they need to confirm it's theirs by confirming via email

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline>
          <div className={classes.paper}>
            <div onClick={() => history.push('/')} className="login-logo">
              <Castle />
              <span>Memesfr</span>
            </div>

            {alert && (
              <span style={{ paddingTop: '1rem', color: 'red' }}>{error}</span>
            )}
            {userCreation ? (
              <ConfirmEmailAddress />
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
                  <Grid className={classes.root} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        inputRef={emailRef}
                        variant="outlined"
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => checkEmailError(e)}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        helperText={emailErrorMessage}
                        error={emailError}
                        InputProps={{
                          className: 'textfield',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        inputRef={passwordRef}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => checkPasswordError(e)}
                        value={password}
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        helperText={passwordErrorMessage}
                        error={passwordError}
                        InputProps={{
                          className: 'textfield',
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={enablePassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>

                  <div className={classes.social}></div>

                  <Grid container justify="flex-start">
                    <Grid item>
                      <Link
                        style={{ color: '#129eda' }}
                        onClick={redirectToLogin}
                        href="#"
                        variant="body2"
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </CssBaseline>
      </Container>
    </MuiThemeProvider>
  );
}
