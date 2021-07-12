import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as Castle } from "../Assets/SVGs/castle.svg";
import "../CSS Components/Login.css";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import Doge from "../Assets/doge.svg";
import firebase from "../services/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Copyright() {
  const history = useHistory();

  function redirectHome() {
    history.push("/");
  }
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" cursor="pointer" onClick={redirectHome}>
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "white",
          backgroundColor: "#e3e3e34a",
          color: "black",
        },
        "&:hover $notchedOutline": {
          borderColor: "white",
        },
        "&$focused $notchedOutline": {
          borderColor: "white",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    "& .MuiPaper-root": {
      backgroundColor: "#272932",
    },
  },
  image: {
    backgroundImage: `url(${Doge})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#4c4d62",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(350deg,  #EA3788, #00A7E1)",
  },
  textfield: {
    color: "white",
    "& $notchedOutline": {
      //add this nested selector
      borderColor: "red",
    },

    "&$cssFocused $notchedOutline": {
      borderColor: "green",
    },
  },
}));

export default function SignInSide(props) {
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [showPassword, showPasswordFunction] = useState(false);

  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const { login } = useAuth();

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      console.log("setting user");
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        setCurrentUser(user);
      });
      return unsubscribe;
    }
    return () => (mount = false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    var email = emailRef.current.value;
    var password = passwordRef.current.value;

    try {
      await login(email, password)
        .then((user) => {
          console.log(user);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          console.log("Error");
          setError("Failed to log in");
        });
    } catch {}
  }
  function redirectToSignup() {
    history.push("/signup");
  }
  function enablePassword() {
    showPasswordFunction(!showPassword);
  }

  return (
    <div className="login-container">
      <MuiThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <div className="login-logo">
                <Castle />
                <span>Memesfr</span>
              </div>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {error ? (
                <span
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "1rem",
                    color: "red",
                  }}
                >
                  Invalid email or password. Please double-check and try again.
                </span>
              ) : null}
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={classes.form}
                noValidate
              >
                <TextField
                  inputRef={emailRef}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    className: "textfield",
                  }}
                />
                <TextField
                  inputRef={passwordRef}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    className: "textfield",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={enablePassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" onClick={redirectToSignup} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <div className="return-home">
                  <Link
                    onClick={() => history.push("/")}
                    style={{ cursor: "pointer" }}
                  >
                    Return Home
                  </Link>
                </div>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
