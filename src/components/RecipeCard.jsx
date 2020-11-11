import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import imageUnavailable from '../images/noImage.jpg';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 50
    },
    grid: {
      width: '100%',
      margin: '0px'
    },
    leftColumn: {
      marginLeft: 50
    },
    recipePaper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: 'black',
      marginBottom: 20,
    }
  }));

const RecipeCard = (props) => {
    const classes = useStyles();
    const imgStyle = {
        height: 'auto',
        maxWidth: '20%'
    };

  return (
    <div className={classes.root}> 
       <Grid container spacing={7} className={classes.grid} direction="row">         
          <Grid item xs={8} md={8}  className={classes.leftColumn}>
            <Paper className={classes.recipePaper}>
              <img src={props.imageUrl} alt="" style={imgStyle}></img>
              <p> Recipe ID: {props.recipeId} </p>
              <p> Recipe Name: {props.recipeName} </p>
              <p> Time to Cook: {props.timeToCookInMinutes} </p>
              <p> Calories: {props.calories} </p>
              <p> Servings: {props.servings} </p>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

RecipeCard.propTypes = {
    imageUrl: PropTypes.string,
    recipeName: PropTypes.string,
    recipeId: PropTypes.number
};

export default RecipeCard;