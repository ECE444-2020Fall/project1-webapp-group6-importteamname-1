import React, { useState } from 'react';
import RecipeCard from "../../components/common/RecipeCard";
import CONSTANTS from '../../constants';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: 100,
    marginLeft: 50,
    width: "100%"
  }
}));

const RecipeCart = () => {
  const classes = useStyles();
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
    recipeSearchResult = <div className={classes.root}>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
        {cartedRecipes.map(recipe => (
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