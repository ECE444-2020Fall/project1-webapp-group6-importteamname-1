import React from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';

const RecipeSearchResults = (props) => {
  let recipeSearchResult = null;

  let handleSortToggle = (valueToBeSorted) => {
    if (valueToBeSorted === "clear_sort_filter") {
      
    }

    const currentSortOrder = props.data.sortOrder;
    
    if (currentSortOrder === "descending") {
      const sortedRecipes = props.data.recipes.sort((recipeA, recipeB) => recipeA[valueToBeSorted] - recipeB[valueToBeSorted]);
      props.sortRecipesAscending(sortedRecipes, valueToBeSorted.toUpperCase());
    } else if (currentSortOrder === "ascending") {
      const sortedRecipes = props.data.recipes.sort((recipeA, recipeB) => recipeB[valueToBeSorted] - recipeA[valueToBeSorted]);
      props.sortRecipesDescending(sortedRecipes, valueToBeSorted.toUpperCase());
    } 
  }

/* 
if sortedRecipes not empty, accesss it
if empty, access recipes
*/

  if (props.data.recipes) { 
    recipeSearchResult = <div>
          {props.data.recipes.map(recipe => (
            <Link key={recipe.recipe_id} to={`recipe-search-results/${recipe.recipe_id}`}>
              <RecipeCard 
                key={recipe.recipe_id}
                recipeId={recipe.recipe_id} 
                recipeName={recipe.recipe_name}
                imageUrl={recipe.image_url}
                timeToCookInMinutes={recipe.time_to_cook_in_minutes}
                servings={recipe.servings}
                calories={recipe.calories}
                protein={recipe.protein}
                carbs={recipe.carbs}
                fat={recipe.fat} 
              />
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
        <p>Sort by:</p>
        <button onClick={() => handleSortToggle("time_to_cook_in_minutes")}>Time To Cook</button>
        <button onClick={() => handleSortToggle("calories")}>Calories</button>
        <button onClick={() => handleSortToggle("servings")}>Servings</button>
        <button onClick={() => handleSortToggle("clear_sort_filter")}>Clear Sorting</button>
        {recipeSearchResult}
    </main>
  );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object,
  sortRecipesAscending: PropTypes.func,
  sortRecipesDescending: PropTypes.func
};

const mapStateToProps = (state) => ({data: state.recipes})

const mapDispatchToProps = (dispatch) => {
  return {
    sortRecipesAscending: (sortedRecipes, valueToBeSorted) => { 
      dispatch({
        type:`SORT_BY_${valueToBeSorted}_ASCENDING`, 
        sortedRecipes: sortedRecipes
      })
    },
    sortRecipesDescending: (sortedRecipes, valueToBeSorted) => {
      dispatch({
        type: `SORT_BY_${valueToBeSorted}_DESCENDING`,
        sortedRecipes: sortedRecipes
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchResults);