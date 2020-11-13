﻿import React, { useState, useEffect } from "react";
import Ingredients from "../../components/RecipeDetail/Ingredients";
import NutritionFacts from "../../components/RecipeDetail/NutritionFacts";
import RecipeRating from "../../components/RecipeDetail/RecipeRating";
import RecipeUserNotes from "../../components/RecipeDetail/RecipeUserNotes";
import RecipeInstruction from "../../components/RecipeDetail/RecipeInstruction";
import { useParams } from "react-router-dom";
import { UserRating } from "../../components/UserRating";
import { FavouritesButton } from "../../components/FavouritesButton";
import { RecipeCartButton } from "../../components/RecipeCartButton";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import CONSTANTS from '../../constants';

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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  userActionsPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20
  },
  instructionsPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  userAddNotesPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 200
  },
  ingredientsPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 300
  },
  nutritionFactsPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    minHeight: 200
  },
}));

const RecipeDetail = (props) => {
  let { recipe_id } =  useParams();
  const classes = useStyles();
  const [ingredients, setIngredients] = useState({});
  let currentRecipe = props.data.recipes.find(recipe => recipe.recipe_id == recipe_id)

  useEffect(() => {
    (async () => {
      await fetch(`${CONSTANTS.ENDPOINT.GET_ALL_INGREDIENTS_BY_RECIPE_ID}/${recipe_id}`)
      .then(response => response.json())
      .then(fetchedIngredients =>{
        setIngredients(fetchedIngredients);
      })
    })();
  }, []);

  return (
    <div className={classes.root}>
        <Grid container spacing={7} className={classes.grid} direction="row">  
          <Grid item xs={3} md={3} direction="column">
            <Paper className={classes.ingredientsPaper}>
               <Ingredients servings={currentRecipe.servings} 
                            ingredientsList={ingredients} />
            </Paper>
            <Paper className={classes.nutritionFactsPaper}>
              <NutritionFacts calories={currentRecipe.calories} 
                              protein={currentRecipe.protein} 
                              carbs={currentRecipe.carbs} 
                              fat={currentRecipe.fat} />
            </Paper>
          </Grid>  
          <Grid item xs={8} md={8} direction="column" className={classes.leftColumn}>
            <Paper className={classes.recipePhotoPaper}>
              <p> Recipe ID {recipe_id} </p>
              <p> Recipe Name: {currentRecipe.recipe_name} </p>
              <p> Image: {currentRecipe.image_url} </p>
              <p> Cuisine: {currentRecipe.cuisine} </p>
            </Paper>
            <Paper className={classes.userActionsPaper}>
              <RecipeRating />
              <UserRating recipe_id={recipe_id} />
              <RecipeCartButton recipe_id={recipe_id} />
              <FavouritesButton recipe_id={recipe_id} />
            </Paper>
            <Paper className={classes.instructionsPaper}>
              <RecipeInstruction timeToCookInMinutes={currentRecipe.time_to_cook_in_minutes} 
                                 instructions={currentRecipe.instructions} />
            </Paper>
            <Paper className={classes.userAddNotesPaper}>
              <RecipeUserNotes />
              <Button variant="contained" color="primary">
                Add Note
              </Button>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

RecipeDetail.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.func
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecipes})(RecipeDetail);