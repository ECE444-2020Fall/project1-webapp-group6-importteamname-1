import React from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';

const RecipeSearchResults = (props) => {
  
// https://stackblitz.com/edit/react-2njvau?file=index.js


 // Use switch-case 
 // Pass in the attribute that we wanna sort the recipes by 
  let handleSortAscending = () => {
    const sortedRecipes = props.data.recipes.sort((a, b) => a.time_to_cook_in_minutes - b.time_to_cook_in_minutes);
    console.log(sortedRecipes);
    props.sortRecipesByTimeToCookAscending(sortedRecipes);
  }

  let handleSortDescending = () => {
    const sortedRecipes = props.data.recipes.sort((a, b) => b.time_to_cook_in_minutes - a.time_to_cook_in_minutes);
    console.log(sortedRecipes);
    props.sortRecipesByTimeToCookDescending(sortedRecipes);
  }
  

  let recipeSearchResult = null;

  if (props.data.recipes) { 
    recipeSearchResult = <div>
          {props.data.recipes.map(recipe => (
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
      </div>
  } else {
    recipeSearchResult = <p>No recipes available.</p>
  }

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Recipe Search Results</h3>
      </div>
        <button onClick={handleSortAscending}>Sort preparation time asc</button>
        <button onClick={handleSortDescending}>Sort preparation time desc</button>
         {recipeSearchResult}
    </main>
  );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object,
  sortRecipesByTimeToCookAscending: PropTypes.object,
  sortRecipesByTimeToCookDescending: PropTypes.object
};

const mapStateToProps = (state) => ({data: state.recipes})

const mapDispatchToProps = (dispatch) => {
  return {
    sortRecipesByTimeToCookAscending: (sortedRecipes) => { 
        dispatch({
          type:'SORT_TIME_TO_COOK_ASCENDING', 
          sortedRecipesByTimeToCookAscending: sortedRecipes
        })
      },
      sortRecipesByTimeToCookDescending: (sortedRecipes) => {
         dispatch({
          type: 'SORT_TIME_TO_COOK_DESCENDING',
          sortedRecipesByTimeToCookDescending: sortedRecipes
         })
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchResults);