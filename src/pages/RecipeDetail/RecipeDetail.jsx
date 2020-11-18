﻿/**
 * FileName: RecipeDetail.jsx
 *
 * Description: 
 * 
 * This page displays the following information pertaining to a specific recipe:
 * - Recipe Name
 * - Recipe photo
 * - Recipe cuisine(s)
 * - Servings
 * - Ingredients
 * - Recipe instruction
 * - Nutrition facts (calories, carbs, protein, fat)
 * - A button that allows the user to add this recipe to RecipeCart
 * - A button that allows the user to add this recipe to FavouriteRecipes list
 * - A rating system that allows the user to rate this recipe
 * - A form that allows the user to add notes on this recipe (e.g. "This recipe is easy to prepare")
 * 
 * Author(s): Tim Fei
 * Date: November 17, 2020 
 */

import React, { useState, useEffect } from "react";
import Ingredients from "../../components/RecipeDetail/Ingredients";
import NutritionFacts from "../../components/RecipeDetail/NutritionFacts";
import RecipeInstruction from "../../components/RecipeDetail/RecipeInstruction";
import { useParams } from "react-router-dom";
import { UserRating } from "../../components/RecipeDetail/UserRating";
import { FavouritesButton } from "../../components/RecipeDetail/FavouritesButton";
import { RecipeCartButton } from "../../components/RecipeDetail/RecipeCartButton";
import { UserNotesContainer } from "../../containers/RecipeDetail/UserNotesContainer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import CONSTANTS from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7'
  },
  grid: {
    width: '100%',
    margin: 0,
    justifyContent: 'center',
  },
  leftColumn: {
    marginLeft: 2
  },
  commonPaperStyleAttributes: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  recipePhotoPaper: {
    minHeight: 300
  },
  userActionsPaper: {
    marginBottom: 20
  },
  instructionsPaper: {
    minHeight: 300
  },
  userAddNotesPaper: {
    minHeight: 200
  },
  ingredientsPaper: {
    minHeight: 300
  },
  nutritionFactsPaper: {
    minHeight: 200
  },
  recipeAttributeText: {
    fontWeight: 600
  },
  recipeImage: {
    maxWidth: 400,
    maxWeight: 200,
    width: 'auto',
    height: 'auto'
  }
}));

const RecipeDetail = (props) => {
  let { recipe_id } = useParams();
  const classes = useStyles();
  const [ingredients, setIngredients] = useState({});

  // Check the Redux store to figure out which recipe the user is currently looking at
  let currentRecipe = props.data.recipes.find(recipe => recipe.recipe_id == recipe_id);

  // Retrieve all the ingredients that correspond to a specific recipe.
  useEffect(() => {
    (async () => {
      await fetch(`${CONSTANTS.ENDPOINT.GET_ALL_INGREDIENTS_BY_RECIPE_ID}/${recipe_id}`)
        .then(response => response.json())
        .then(fetchedIngredients => {
          setIngredients(fetchedIngredients);
        });
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.grid} direction="row">
        <Grid item xs={3} md={3} direction="column">
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.ingredientsPaper}`}>
            <Ingredients servings={currentRecipe.servings} ingredientsList={ingredients} />
          </Paper>
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.nutritionFactsPaper}`}>
            <NutritionFacts
              calories={currentRecipe.calories}
              protein={currentRecipe.protein}
              carbs={currentRecipe.carbs}
              fat={currentRecipe.fat}
            />
          </Paper>
        </Grid>
        <Grid item xs={5} md={5} direction="column" className={classes.leftColumn}>
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.recipePhotoPaper}`}>
            <img src={currentRecipe.image_url} className={classes.recipeImage}></img>
            <br /><br />
            <h3> {currentRecipe.recipe_name} </h3>
            <h7 className={classes.recipeAttributeText}> Cuisine(s): </h7> {(currentRecipe.cuisine).slice(1, currentRecipe.cuisine.length - 1)}
          </Paper>
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.userActionsPaper}`}>
            <UserRating recipe_id={recipe_id} />
            <RecipeCartButton recipe_id={recipe_id} />
            <FavouritesButton recipe_id={recipe_id} />
          </Paper>
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.instructionsPaper}`}>
            <RecipeInstruction
              timeToCookInMinutes={currentRecipe.time_to_cook_in_minutes}
              instructions={currentRecipe.instructions}
            />
          </Paper>
          <Paper className={`${classes.commonPaperStyleAttributes} ${classes.userAddNotesPaper}`}>
            <UserNotesContainer />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

RecipeDetail.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.func
};

const mapStateToProps = (state) => ({ data: state.recipes });

export default connect(mapStateToProps, { getRecipes })(RecipeDetail);