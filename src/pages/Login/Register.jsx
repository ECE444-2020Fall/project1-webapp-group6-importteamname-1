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
import background4 from './background4.png'
import background5 from './background5.png'
import background6 from './background6.png'
import background7 from './background7.png'
import background8 from './background8.png'
import background9 from './background9.png'

function Background() {
    var rand = Math.floor(Math.random() * Math.floor(9))
    if(rand == 0){
      return background1
    }
    else if (rand == 1){
      return background2
    }
    else if (rand == 2){
      return background3
    }
    else if(rand == 3){
      return background4
    }
    else if (rand == 4){
      return background5
    }
    else if (rand == 5){
      return background6
    }
    else if(rand == 6){
      return background7
    }
    else if (rand == 7){
      return background8
    }
    else{
      return background9
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
}));


const Register = () => {
    // Must add login support

    //Register Vars
    
    const [user, setUser] = React.useState("")
    const [userError, setUserError] = React.useState(false)
    const [pass, setPass] = React.useState("")
    const [pass2, setPass2] = React.useState("")
    const [passError, setPassError] = React.useState(false)
    const [passInvalid, setPassInvalid] = React.useState("")
    const [userCreated, setUserCreated] = React.useState(false)


    function validateText(val) {
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    function validateEqualPass(val1, val2){
        if (val1 == val2){
            return (true)
        }
        return (false)
    }

    //REGISTER
    const handleUserChange = (val) => {
        setUser(val.target.value)
        setUserError(!validateText(val.target.value))
    }

    const handlePassChange = (val) => {
        setPass(val.target.value)
        if (validateText(val.target.value) && validateEqualPass(val.target.value, pass2)) {
            setPassError(false)
        } else {
            setPassError(true)
        }
       
    }

    const handlePass2Change = (val) => {
        setPass2(val.target.value)
        if (validateText(val.target.value) && validateEqualPass(pass, val.target.value)) {
            setPassError(false)
        } else {
            setPassError(true)
        }
    }

    const handleRegister = (evt) => {
        //Write validation for users
        evt.preventDefault()
        var validUser = false
        if (validateText(user) && validateText(pass)) {
            //handle 
            //setValidUser(false)
            //const req = CONSTANTS.ENDPOINT.LOGIN + String(userL) + "/" + String(passL);
            const req = CONSTANTS.ENDPOINT.REGISTER;
            fetch(req, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    'name': user,
                    'password': pass
                })
            })
            .then(response => {
              return response.json();
            })
            .then(body => {
                validUser=body.userFree
                if(!validUser){
                    setPass("")
                    setPassInvalid("Username already exists")
                    setUserCreated(false)
                    setUserError(true)

                }
                else{
                    setUserCreated(true)
                    setPassInvalid("")
                }
            }
            )   
        }
        document.getElementById("Register-Form").reset()
        return
    }
    const classes = useStyles();
    if(!userCreated){
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
                            Register
                        </Typography>
                        <form id="Register-Form" className={classes.form} onSubmit={handleRegister}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleUserChange}
                                id="username"
                                label="Username"
                                error={userError}
                                autoComplete="Username"
                                autoFocus />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                onChange={handlePassChange}
                                required
                                fullWidth
                                error={passError}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password" />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={handlePass2Change}
                                error={passError}
                                label="Confrim Password"
                                type="password"
                                id="password"
                                autoComplete="confirm-password" />
                            {passInvalid.length > 0 && <span id="error">&nbsp;{passInvalid}</span>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link href="Login" variant="body2">
                                        {"Already have an account? Sign in!"}
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
export default Register;



