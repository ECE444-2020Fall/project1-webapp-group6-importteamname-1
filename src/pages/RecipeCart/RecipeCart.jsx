import React, { useState } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants'

const RecipeCart = () => {
  const [refresh, setRefresh] = useState(true);
  const [cartedRecipes, setCartedRecipes] = useState([])

  if (refresh) {
    setRefresh(false)
    fetch(CONSTANTS.ENDPOINT.RECIPE_CART, {
      credentials:'include'
    })
      .then(response => response.json())
      .then(response => setCartedRecipes(response.recipes));
  }

  let recipeSearchResult = null;

  if (cartedRecipes.length != 0) {
    recipeSearchResult = <div>
      {cartedRecipes.map(recipe => (
        <Link key={recipe.recipe_id} to={`recipe-search-results/${recipe.recipe_id}`}>
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
    </div>;
  } else {
    recipeSearchResult = <p>No recipes in cart.</p>;
  }

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Recipe Cart</h3>
      </div>
      {recipeSearchResult}
    </main>
  );
};

export default RecipeCart;