import React, { useState, useEffect } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import axios from 'axios';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getRecipes } from '../../actions/recipeActions';

const RecipeSearchResults = (props) => {
  useEffect(() => {
    props.getRecipes()
  }, []);

  // console.log(props.recipes.recipes.recipes);
  let recipeSearchResult = null;

  if (props.recipes.recipes.recipes) { // For some reason, Redux returns the JSON object nested 3 times.
    recipeSearchResult = <div>
          {props.recipes.recipes.recipes.map(recipe => (
            <Link key={recipe.recipe_id} to={"/recipe-search-results/" + recipe.recipe_id}>
              <RecipeCard key={recipe.recipe_id}
                          recipeId={recipe.recipe_id} 
                          recipeName={recipe.recipe_name}
                          imageUrl={recipe.image_url}
                          timeToCookInMinutes={recipe.time_to_cook_in_minutes}
                          servings={recipe.servings}
                          calories={recipe.calories}
                          protein={recipe.protein}
                          carbs={recipe.carbs}
                          fat={recipe.fat} />
              </Link>
          ))}
      </div>
  } else {
    recipeSearchResult = <p>No recipes available.</p>
  }

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Recipe Search Results</h3>
      </div>
         {recipeSearchResult}
    </main>
  );
}

const mapStateToProps = (state) => ({recipes: state.recipes})

export default connect(mapStateToProps, {getRecipes})(RecipeSearchResults);