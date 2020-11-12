import React from "react";
import PropTypes from 'prop-types';

const Ingredients = (props) => {
    
    return (
      <div>
        Ingredients

        {props.ingredients.ingredient_name}
        {/* {props.ingredients.map(ingredient => (
           <p key={ingredient.recipe_id}>{ingredient.ingredient_name}</p>  
        ))} */}

      </div>
    );
  }
  
  Ingredients.propTypes = {
    ingredients: PropTypes.object
  };

  export default Ingredients;