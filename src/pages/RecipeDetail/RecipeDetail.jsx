import React from "react";
import Ingredients from "../../components/RecipeDetail/Ingredients";
import NutritionFacts from "../../components/RecipeDetail/NutritionFacts";
import RecipeRating from "../../components/RecipeDetail/RecipeRating";
import RecipeUserNotes from "../../components/RecipeDetail/RecipeUserNotes";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";

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
  recipePhotoPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  userActionsPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20
  },
  instructionsPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  userAddNotesPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 200
  },
  ingredientsPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  nutritionFactsPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 200
  },
}));

const RecipeDetail = () => {
  let { recipe_id } =  useParams();
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={7} className={classes.grid} direction="row">         
          <Grid item xs={8} md={8} direction="column" className={classes.leftColumn}>
            <Paper className={classes.recipePhotoPaper}>
              <p> Recipe ID {recipe_id} </p>
            </Paper>
            <Paper className={classes.userActionsPaper}>
              <RecipeRating />
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
              <Button variant="contained" color="primary">
                Add to Favourites
              </Button>
            </Paper>
            <Paper className={classes.instructionsPaper}>
               <preparationSteps />
            </Paper>
            <Paper className={classes.userAddNotesPaper}>
              <RecipeUserNotes />
              <Button variant="contained" color="primary">
                Add Note
              </Button>
            </Paper>
          </Grid>
     
          <Grid item xs={3} md={3} direction="column">
            <Paper className={classes.ingredientsPaper}>
               <Ingredients />
            </Paper>
            <Paper className={classes.nutritionFactsPaper}>
              <NutritionFacts />
            </Paper>
          </Grid>  
        </Grid>
    </div>
  );
}

export default RecipeDetail;