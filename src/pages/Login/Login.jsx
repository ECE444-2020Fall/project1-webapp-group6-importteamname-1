import React from "react";
import CONSTANTS from "../../constants";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Background } from './background';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Background()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {

  }
}));

const Login = () => {
  //Login Vars
  const [user, setuser] = React.useState("");
  const [userError, setUserError] = React.useState(false);
  const [pass, setPass] = React.useState("");
  const [passError, setPassError] = React.useState(false);
  const [passInvalid, setPassInvalid] = React.useState("");
  const [userFound, setUserFound] = React.useState(false);

  const validateText = (val) => (val.length < 5 || val.length > 16) ? false : true;

  const handleLogin = (evt) => {
    //Write validation for users
    evt.preventDefault();
    var validUser = false;
    if (validateText(user) && validateText(pass)) {
      fetch(CONSTANTS.ENDPOINT.LOGIN, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
          'name': user,
          'password': pass
        }),
        withCredentials: true
      })
        .then(response => {
          return response.json();
        })
        .then(body => {
          validUser = body.found;
          if (!validUser) {
            setPass("");
            setPassInvalid("Username/Password Invalid");
            setUserFound(false);
            setPassError(true);
            setUserError(true);
          }
          else {
            setUserFound(true);
            setPassInvalid("");
            localStorage.setItem('user_id', body.user_id);
            console.log("AAAA" + localStorage.getItem('user_id'));
          }
        });
    }
    document.getElementById("Login-Form").reset();
    return;
  };

  const classes = useStyles();

  if (!userFound) {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <center>
              <Typography component="h1" variant="h3">
                Welcome to ChefCoPilot!
              </Typography>
            </center>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form id="Login-Form" className={classes.form} onSubmit={handleLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                error={userError}
                onChange={(val) => {
                  setUserError(!validateText(val.target.value));
                  setuser(val.target.value);
                }
                }
                label="Username"
                autoComplete="Username"
                autoFocus />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={passError}
                onChange={(val) => {
                  setPassError(!validateText(val.target.value));
                  setPass(val.target.value);
                }
                }
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" />
              {passInvalid.length > 0 && <span id="error">&nbsp;{passInvalid}</span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </ Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
  else {
    return <Redirect to='/welcome' />;
  }
};
export default Login;