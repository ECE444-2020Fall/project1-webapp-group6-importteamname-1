import React, { useState } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants'

const FavouriteRecipes = () => {
  const [refresh, setRefresh] = useState(true);
  const [favouriteRecipes, setFavouriteRecipes] = useState([])

  if (refresh) {
    setRefresh(false)
    fetch(CONSTANTS.ENDPOINT.FAVOURITES_LIST, {
      credentials:'include'
    })
      .then(response => response.json())
      .then(response => setFavouriteRecipes(response.recipes));
  }

  let recipeSearchResult = null;

  if (favouriteRecipes.length != 0) {
    recipeSearchResult = <div>
      {favouriteRecipes.map(recipe => (
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
    recipeSearchResult = <p>No recipes favourited.</p>;
  }

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Favourite Recipes</h3>
      </div>
      {recipeSearchResult}
    </main>
  );
};

export default FavouriteRecipes;