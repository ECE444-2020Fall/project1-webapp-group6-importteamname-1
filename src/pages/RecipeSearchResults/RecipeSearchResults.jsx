import React, { useState, useEffect } from 'react';
import RecipeCard from "../../components/RecipeCard";
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeSearchResults = () => {
  const [data, setData] = useState({ recipes: [] });

  useEffect(() => {
    (async () => {
      const recipeSearchResult = await axios(
        'http://localhost:3001/api/recipes',
      );
 
      setData(recipeSearchResult.data);
    })();
  }, []);

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Recipe Search Results</h3>
      </div>
        {data.recipes.map(recipe => (
          <Link to={"/recipe-search-results/" + recipe.recipe_id}>
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
    </main>
  );
}

export default RecipeSearchResults;