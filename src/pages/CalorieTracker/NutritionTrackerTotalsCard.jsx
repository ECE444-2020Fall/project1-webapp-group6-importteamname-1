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

const NutritionTrackerTotalsCard = (props) => {
    const classes = useStyles();

  return (
    <div className={classes.root}> 
       <Grid container spacing={7} className={classes.grid} direction="row">         
          <Grid item xs={8} md={8}  className={classes.leftColumn}>
            <Paper className={classes.recipePaper}>
              <p> Total Calories: {props.total_calories} </p>
              <p> Total Carbs: {props.total_carbs} </p>
              <p> Total Protein: {props.total_protein} </p>
              <p> Total Fat: {props.total_fat} </p>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

NutritionTrackerTotalsCard.propTypes = {
    total_calories: PropTypes.number,
    total_carbs: PropTypes.number,
    total_protein: PropTypes.number,
    total_fat: PropTypes.number,
};

export default NutritionTrackerTotalsCard;