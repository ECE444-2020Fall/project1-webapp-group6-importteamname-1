import React from "react";
import CONSTANTS from "../../constants";
//import styles from "./styles.module.css";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import background1 from './background1.png'
import background2 from './background2.png'
import background3 from './background3.png'



function Background() {
  var rand = Math.floor(Math.random() * Math.floor(3))
  if(rand == 0){
    return background1
  }
  else if (rand == 1){
    return background2
  }
  else{
    return background3
  }
}

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
    // Must add login support


    //Login Vars
    const [userL, setUserL] = React.useState("")
    const [userErrorL, setUserErrorL] = React.useState(false)
    const [passL, setPassL] = React.useState("")
    const [passErrorL, setPassErrorL] = React.useState(false)
    const [passInvalid, setPassInvalid] = React.useState("")
    const [userFound, setUserFound] = React.useState(false)
    
    function validateUser(val) {
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    function validatePass(val){
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    //LOGIN

    const handleUserChangeL = (val) => {
        if (validateUser(val.target.value)) {
            setUserErrorL(false);
        } else {
            setUserErrorL(true);
        }
        setUserL(val.target.value)
    }

    const handlePassChangeL = (val) => {
        if (validatePass(val.target.value)) {
            setPassErrorL(false)
        } else {
            setPassErrorL(true)
        }
        setPassL(val.target.value)
    }


    const handleLogin = (evt) => {
        //Write validation for users
        evt.preventDefault()
        var validUser = false
        if (validateUser(userL) && validatePass(passL)) {
            //handle 
            //setValidUser(false)
            //const req = CONSTANTS.ENDPOINT.LOGIN + String(userL) + "/" + String(passL);
            const req = CONSTANTS.ENDPOINT.LOGIN;
            fetch(req, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    'name': userL,
                    'password': passL
                })
            })
            .then(response => {
              if (!response.ok) {
                throw Error(response.statusText);
              }
              return response.json();
            })
            .then(body => {
              validUser=body.found
              if(!validUser){
                setPassL("")
                console.log("Invalid")
                setPassInvalid("Username/Password Invalid")
                setUserFound(false)
                setPassErrorL(true)
                setUserErrorL(true)

              }
              else{
                console.log("Valid")
                setUserFound(true)
                setPassInvalid("")
              }

              }
            )
            
            
        } else {
            setPassL("")
            return
        }
        //check database for login
        //return
    }
    const classes = useStyles();

    if(!userFound){
      return (
          <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                          <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                          Login
                      </Typography>
                      <form className={classes.form} onSubmit={handleLogin}>
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              error={userErrorL}
                              onChange={handleUserChangeL}
                              label="Username"
                              autoComplete="Username"
                              autoFocus />
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              error={passErrorL}
                              onChange={handlePassChangeL}
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
                          </Button>
                          
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
    else{
      
      return <Redirect to='/welcome'/>
    }


}
export default Login;



