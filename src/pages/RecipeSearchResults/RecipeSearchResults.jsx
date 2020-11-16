import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Divider, Box } from "@material-ui/core";
import RecipeCard from "../../components/common/RecipeCard";
import SortRecipeDropDown from "../../components/RecipeSearchResults/SortRecipesDropDown";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#f7f7f7',
    width: "100%"
  },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  },
  topBanner: {
    flexGrow: 1,
  },
  recipeCount: {
    marginTop: 20,
  }
}));

const GreyTextTypography = withStyles({
  root: {
    color: "grey"
  }
})(Typography);

const RecipeSearchResults = (props) => {
  const classes = useStyles();
  let recipeSearchResult = null;
  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(props.data.recipes.length / itemsPerPage)
  );

  let recipesToBeDisplayed = props.data.sortedRecipes && props.data.sortedRecipes.length == 0 ? "recipes" : "sortedRecipes";

  if (props.data) {     
    recipeSearchResult =  <div className={classes.root}>
      <div className={classes.topBanner}>
        <Grid container spacing={3} justify="flex-start">
          <Grid className={classes.recipeCount} item xs={6}>
            <GreyTextTypography variant="h7">We found {props.data[recipesToBeDisplayed].length} recipes. Please enjoy.</GreyTextTypography>
          </Grid>
          <Grid container xs={6} justify="flex-end">
            <SortRecipeDropDown />
          </Grid>
        </Grid>
      </div>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {props.data[recipesToBeDisplayed]
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(recipe => (
          <Grid item key={props.recipe_id} xs={25}>
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
            </Grid>
          ))}
        </Grid>
        <br></br>
        <Divider />
        <Box component="span">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          />
        </Box>
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
  recipe_id: PropTypes.string,
  getRecipes: PropTypes.object,
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps)(RecipeSearchResults);