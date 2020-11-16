import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Divider, Box } from "@material-ui/core";
import RecipeCard from "../../components/common/RecipeCard";

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
  }
}));

const RecipeSearchResults = (props) => {
  const classes = useStyles();
  let recipeSearchResult = null;
  const itemsPerPage = 10;
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = React.useState(1);

  const [noOfPages, setNoOfPages] = React.useState(
    props.data.recipes && props.data.recipes.length ? 
      Math.ceil(props.data.recipes.length / itemsPerPage) : null
  );
  

  if (refresh) {
    setRefresh(false)
      setNoOfPages({
      noOfPages:  Math.ceil(props.data.recipes.length / itemsPerPage)
    });
    
  }

  console.log("NO. PAGES");
  console.log(noOfPages);
  console.log("CURRENT PAGE");
  console.log(page);
  console.log(Math.ceil(props.data.recipes.length / itemsPerPage))

  useEffect(() => {
    // NEED TO SET NUMBER OF PAGES BASED ON NO. OF RECIPES ON THE PAGE
    // This makes the numbers disappear in pagination
    // setNoOfPages({
    //   noOfPages:  Math.ceil(props.data.recipes.length / itemsPerPage)
    // });
    
    // TRY THIS!!!
    // get recipes from Redux

    if (props.data.sortedRecipes && props.data.sortedRecipes.length) {
      props.clearRecipeSortFilter();
    }
  }, []);

  const handleSortToggle = (valueToBeSorted) => {    
    const currentSortOrder = props.data.sortOrder;
    let recipesToBeSorted = null;
    let sortedRecipes = null;

    recipesToBeSorted = props.data.sortedRecipes && props.data.sortedRecipes.length == 0 ? [...props.data.recipes] : props.data.sortedRecipes;

    if (currentSortOrder === "descending") {
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeA[valueToBeSorted] - recipeB[valueToBeSorted]);
      props.sortRecipesAscending(sortedRecipes, valueToBeSorted.toUpperCase());
    } else { 
      // currentSortOrder is initialized to ''. When the user clicks the sort button for the first time, we sort recipes descending by default.
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeB[valueToBeSorted] - recipeA[valueToBeSorted]);
      props.sortRecipesDescending(sortedRecipes, valueToBeSorted.toUpperCase());
    } 
  }

  let recipesToBeDisplayed = props.data.sortedRecipes && props.data.sortedRecipes.length == 0 ? "recipes" : "sortedRecipes";

  // console.log(recipesToBeDisplayed);
  // console.log(props.data[recipesToBeDisplayed]);

  if (props.data && props.data[recipesToBeDisplayed]) { 
    recipeSearchResult =  <div className={classes.root}>
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
        <p>Sort by:</p>
        <button onClick={() => handleSortToggle("time_to_cook_in_minutes")}>Time To Cook</button>
        <button onClick={() => handleSortToggle("calories")}>Calories</button>
        <button onClick={() => handleSortToggle("servings")}>Servings</button>
        <button onClick={() => props.clearRecipeSortFilter()}>Clear Sort Filter</button>
      {recipeSearchResult}
    </div>
  );
}

RecipeSearchResults.propTypes = {
  data: PropTypes.object,
  recipe_id: PropTypes.string,
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
    },
    renderPagination: () => {
      dispatch({
        type: "RENDER_PAGINATION"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearchResults);