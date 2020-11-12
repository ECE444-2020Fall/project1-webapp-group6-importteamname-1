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
}));


const Register = () => {
    // Must add login support

    //Register Vars
    
    const [user, setUser] = React.useState("")
    const [userError, setUserError] = React.useState(false)
    const [pass, setPass] = React.useState("")
    const [pass2, setPass2] = React.useState("")
    const [passError, setPassError] = React.useState(false)


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

    function validateEqualPass(val1, val2){
        if (val1 == val2){
            return (true)
        }
        return (false)
    }

    //REGISTER
    const handleUserChange = (val) => {
        setUser(val.target.value)
        if (validateUser(val.target.value)) {
            setUserError(false);
        } else {
            setUserError(true);
        }
        
    }

    const handlePassChange = (val) => {
        setPass(val.target.value)
        if (validatePass(val.target.value) && validateEqualPass(val.target.value, pass2)) {
            setPassError(false)
        } else {
            setPassError(true)
        }
       
    }

    const handlePass2Change = (val) => {
        setPass2(val.target.value)
        if (validatePass(val.target.value) && validateEqualPass(pass, val.target.value)) {
            setPassError(false)
        } else {
            setPassError(true)
        }
    }

    const handleRegister = (evt) => {
        //evt.preventDefault()
        //Write validation for users
        
        if (validateUser(user) && validatePass(pass) && validateEqualPass(pass, pass2)) {
            //handle 
            
        } else {
            evt.preventDefault()
            setPass("")
            setPass2("")
            return 
        }
        //const req = CONSTANTS.ENDPOINT.REGISTER + String(user) + "/" + String(pass);
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
        }).then( Response => {
            return Response.json;
        })
        
        //Write validation for users
        //update database
    }
    const classes = useStyles();

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
                    <form className={classes.form} onSubmit={handleRegister}>
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
export default Register;



