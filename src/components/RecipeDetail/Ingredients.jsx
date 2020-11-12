import React from "react";
import PropTypes from 'prop-types';

const Ingredients = (props) => {
  let recipeIngredients = null;

  if (props.ingredientsList.ingredients) { 
    recipeIngredients = 
      <div>
        {props.ingredientsList.ingredients.map(ingredient => (
          <p key={(ingredient.recipe_id).concat(ingredient.ingredient_name)}>
          {ingredient.ingredient_name} {ingredient.amount} {ingredient.unit_of_measurement}</p>
        ))}
      </div>
  } else {
    recipeIngredients = <p>No Ingredients.</p>
  }
  
  return (
      <div>
        Ingredients:
        {recipeIngredients}
      </div>
    );
  }
  
  Ingredients.propTypes = {
    ingredients: PropTypes.object,
    ingredientsList: PropTypes.object
  };

  export default Ingredients;