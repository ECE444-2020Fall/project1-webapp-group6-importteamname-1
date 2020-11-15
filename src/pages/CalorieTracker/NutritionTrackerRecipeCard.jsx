import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const NutritionTrackerRecipeCard = (props) => {
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
              <p> Recipe Name: {props.recipeName} </p>
              <p> Calories: {props.calories} </p>
              <p> Carbs: {props.carbs} </p>
              <p> Protein: {props.protein} </p>
              <p> Fat: {props.fat} </p>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

NutritionTrackerRecipeCard.propTypes = {
    imageUrl: PropTypes.string,
    recipeName: PropTypes.string,
    calories: PropTypes.number,
    carbs: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
};

export default NutritionTrackerRecipeCard;