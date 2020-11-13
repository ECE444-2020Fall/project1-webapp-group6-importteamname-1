import React, { useEffect } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';

const RecipeSearchResults = (props) => {
  let recipeSearchResult = null;

  /*
  When a user refreshes the page or revisit the web app, we need to show unsorted recipes.
  We use useEffect() to clear sortedRecipes from Redux store when a user refreshes the page.
  */
  useEffect(() => {
    props.clearRecipeSortFilter();
  }, []);

  const handleSortToggle = (valueToBeSorted) => {    
    const currentSortOrder = props.data.sortOrder;
    let recipesToBeSorted = null;

    if (props.data.sortedRecipes.length == 0) {
      recipesToBeSorted = [...props.data.recipes];
    } else {
      recipesToBeSorted = props.data.sortedRecipes;
    }

    if (currentSortOrder === "descending") {
      const sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeA[valueToBeSorted] - recipeB[valueToBeSorted]);
      props.sortRecipesAscending(sortedRecipes, valueToBeSorted.toUpperCase());
    } else if (currentSortOrder === "ascending") {
      const sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeB[valueToBeSorted] - recipeA[valueToBeSorted]);
      props.sortRecipesDescending(sortedRecipes, valueToBeSorted.toUpperCase());
    } 
  }

  let recipesToBeDisplayed = props.data.sortedRecipes.length == 0 ? "recipes" : "sortedRecipes";

  if (props.data[recipesToBeDisplayed]) { 
    recipeSearchResult = <div>
          {props.data[recipesToBeDisplayed].map(recipe => (
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
        <button onClick={() => props.clearRecipeSortFilter()}>Clear Sort Filter</button>
        {recipeSearchResult}
    </main>
  );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object,
  sortRecipesAscending: PropTypes.func,
  sortRecipesDescending: PropTypes.func,
  clearRecipeSortFilter: PropTypes.func
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
    },
    clearRecipeSortFilter: () => {
      dispatch({
        type: "CLEAR_RECIPE_SORT_FILTER",
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchResults);