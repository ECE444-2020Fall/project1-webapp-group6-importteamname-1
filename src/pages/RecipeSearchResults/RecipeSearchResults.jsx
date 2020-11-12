import React, { useEffect } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';

const RecipeSearchResults = (props) => {
  useEffect(() => {
    props.getRecipes()
  }, []);

  let recipeSearchResult = null;

  if (props.data.recipes) { 
    recipeSearchResult = <div>
          {props.data.recipes.map(recipe => (
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

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecipes})(RecipeSearchResults);