import React, { useEffect } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { UserRating } from "../../components/UserRating";
import { FavouritesButton } from "../../components/FavouritesButton";
import { RecipeCartButton } from "../../components/RecipeCartButton";
import foodImg from "./food.png"; // Placeholder food image

const RecipeSearchResults = (props) => {
  useEffect(() => {
    props.getRecipes()
  }, []);

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
    // <main id="mainContent" className="container">
    //   <div className="row justify-content-center py-5">
    //     <h3>Recipe Search Results</h3>
    //   </div>
    //      {recipeSearchResult}
    // </main>

    <div style={{ marginTop: 20, padding: 130 }}>
      <Grid container spacing={60} justify="center">
        {props.data.recipes.map(recipe => (
          <Link key={recipe.recipe_id} to={`recipe-search-results/${recipe.recipe_id}`}>
            <Grid item key={recipe.recipe_id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="280"
                    image={foodImg}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {recipe.recipe_name} 
                    </Typography>
                    <Typography component="p">
                      {recipe.calories} Calories
                    </Typography>
                    <br></br>
                    <Typography component="p">
                      <UserRating recipe_id={recipe.recipe_id} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <RecipeCartButton recipe_id={recipe.recipe_id} />
                  <FavouritesButton recipe_id={recipe.recipe_id} />
                </CardActions>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>
    </div>


  );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecipes})(RecipeSearchResults);