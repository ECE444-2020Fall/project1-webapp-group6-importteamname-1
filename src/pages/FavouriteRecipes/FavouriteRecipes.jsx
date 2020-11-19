import React, { useState } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import CONSTANTS from '../../constants';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginLeft: 50,
    width: "100%"
  },
}));

const FavouriteRecipes = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(true);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  if (refresh) {
    setRefresh(false);
    fetch(`${CONSTANTS.ENDPOINT.FAVOURITES_LIST}/${localStorage.getItem('user_id')}`)
      .then(response => response.json())
      .then(response => setFavouriteRecipes(response.recipes));
  }

  let recipeSearchResult = null;

  if (favouriteRecipes.length != 0) {
    recipeSearchResult = <div className={classes.root}>
      <Grid
        container
        spacing={5}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {favouriteRecipes.map(recipe => (
          <Grid item key={recipe.recipe_id} xs={25}>
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
          </Grid>
        ))}
      </Grid>
    </div>;
  } else {
    recipeSearchResult = <p>No recipes favourited.</p>;
  }

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3 >Favourite Recipes</h3>
      </div>
      {recipeSearchResult}
    </main>
  );
};

export default FavouriteRecipes;