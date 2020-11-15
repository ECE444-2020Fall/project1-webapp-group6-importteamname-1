import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants'
import NutritionTrackerRecipeCard from "./NutritionTrackerRecipeCard";
import NutritionTrackerTotalsCard from "./NutritionTrackerTotalsCard";

const TrackCalories = () => {
  const [refresh, setRefresh] = useState(true);
  const [consumedRecipes, setConsumedRecipes] = useState([])
  const [nutritionFacts, setNutritionFacts] = useState([])

  if (refresh) {
    setRefresh(false)
    fetch(CONSTANTS.ENDPOINT.GET_CONSUMED_RECIPES, {
      credentials:'include'
    })
      .then(response => response.json())
      .then(response => {
        setNutritionFacts(response.nutrition_facts);
        setConsumedRecipes(response.consumed_recipes);
      })
  }

  let consumedRecipeResults = null;
  let consumedRecipeTotals = null;

  if (consumedRecipes.length != 0) {
    consumedRecipeResults = <div>
      {consumedRecipes.map(consumedRecipe => (
        <Link key={consumedRecipe.recipe_id} to={`recipe-search-results/${consumedRecipe.recipe_id}`}>
          <NutritionTrackerRecipeCard key={consumedRecipe.recipe_id}
            recipeName={consumedRecipe.recipe_name}
            imageUrl={consumedRecipe.image_url}
            calories={consumedRecipe.calories}
            protein={consumedRecipe.protein}
            carbs={consumedRecipe.carbs}
            fat={consumedRecipe.fat} />
        </Link>
      ))}
    </div>;
    consumedRecipeTotals = <div>
      <NutritionTrackerTotalsCard
        total_calories={nutritionFacts.total_calories}
        total_carbs={nutritionFacts.total_carbs}
        total_protein={nutritionFacts.total_protein}
        total_fat={nutritionFacts.total_fat} />
    </div>
  } else {
    consumedRecipeResults = <p>You did not eat any recipes.</p>;

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Nutrition Tracker</h3>
      </div>
      {consumedRecipeResults}
      {consumedRecipeTotals}
    </main>
  )
}
}
export default TrackCalories;

