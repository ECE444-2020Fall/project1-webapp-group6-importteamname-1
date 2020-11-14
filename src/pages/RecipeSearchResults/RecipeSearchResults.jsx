import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { UserRating } from "../../components/UserRating";
import { FavouritesButton } from "../../components/FavouritesButton";
import { RecipeCartButton } from "../../components/RecipeCartButton";
import foodImg from "./food.png"; // Placeholder food image
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: 100,
    marginLeft: 150,
  }
}));

const RecipeSearchResults = (props) => {
  useEffect(() => {
    props.getRecipes()
  }, []);

  const classes = useStyles();
  let recipeSearchResult = null;

  if (props.data.recipes) { 
    recipeSearchResult =  <div className={classes.root}>
          <Grid
            container
            spacing={5}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
          {props.data.recipes.map(recipe => (
            <Grid item key={recipe.recipe_id} xs={25}>
              <Card>
                <CardActionArea>
                  <Link key={recipe.recipe_id} to={`recipe-search-results/${recipe.recipe_id}`} >
                    <CardMedia
                      component="img"
                      alt="imageUnavailable"
                      height="280"
                      image={foodImg}
                    />
                  </Link>
                  <CardContent>
                    <Link key={recipe.recipe_id} to={`recipe-search-results/${recipe.recipe_id}`} >
                      <Typography color="textPrimary" gutterBottom variant="h5" component="h2">
                        {recipe.recipe_name} 
                      </Typography>
                      <Typography color="textPrimary" component="p">
                        {recipe.calories} Calories
                      </Typography>
                    </Link>
                    <Typography >
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
          ))}
        </Grid>
      </div>
  } else {
    recipeSearchResult = <p>No recipes available.</p>
  }

  return (
    <div>
      {recipeSearchResult}
    </div>
    );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecipes})(RecipeSearchResults);