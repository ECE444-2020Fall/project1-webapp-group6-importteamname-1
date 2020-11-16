import React from "react";
import CONSTANTS from "../../constants";
//import styles from "./styles.module.css";
//import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Background} from './background'

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

const Profile = () => {
    // Must add login support
    const [loggedOut, setLoggedOut] = React.useState(false)


    const handleLogout = (evt) => {
      evt.preventDefault()
      fetch(CONSTANTS.ENDPOINT.LOGOUT, {
        credentials: 'include'
      })
      setLoggedOut(true)
    }


    //Login Vars
    const classes = useStyles();
    if(!loggedOut){
      return (
          <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <div className={classes.paper}>
                      <Typography component="h1" variant="h3" color="primary" align="center">
                          Welcome to ChefCoPilot
                      </Typography>
                      <p/>
                      <Typography component="h1" variant="body1">
                          Enjoy our many features designed to help you meal prep!
                      </Typography>
                      <p/>
                      <Typography component="h1" variant="body2">
                          Use the navagation bar on the top of your screen to traverse the app
                      </Typography>
                      <p/>
                      <form onSubmit={ handleLogout }>
                        <Button
                        type="submit"
                        varient="contained" 
                        color="primary" 
                        href='/login'
                        fullWidth
                        className= { classes.submit }>
                            Logout
                        </Button>
                      </form>
                  </div>
              </Grid>
          </Grid>
      );
    }
    return <Redirect to='/login'/>


}
export default Profile;



