/**
 * FileName: SortRecipesDropDown.jsx
 *
 * Description: This feature is used to sort recipes that are being displayed on the RecipeSearchResult page.
 * 
 * Author(s): Tim Fei
 * Date: November 17, 2020 
 */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f7f7f7',
  },
  undoSortButton: {
    marginTop: 20,
    marginRight: 50
  },
  formControl: {
    marginTop: 10,
    minWidth: 300,
    marginRight: 50
  }
}));

const SortRecipesDropDown = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [sortLabel, setSortLabel] = React.useState("");

  useEffect(() => {
    props.clearRecipeSortFilter();
  }, []);

  const handleChange = (event) => {
    let recipesToBeSorted = null;
    let sortedRecipes = null;
    let sortOrder = event.target.value.order;
    let valueToBeSorted = event.target.value.sortValue;
    setSortLabel(`${valueToBeSorted} (${sortOrder})`);
    recipesToBeSorted = props.data.sortedRecipes && props.data.sortedRecipes.length == 0 ? [...props.data.recipes] : props.data.sortedRecipes;

    if (sortOrder === "ascending") {
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeA[valueToBeSorted] - recipeB[valueToBeSorted]);
      props.sortRecipesAscending(sortedRecipes, valueToBeSorted.toUpperCase());
    } else if (sortOrder === "descending") {
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeB[valueToBeSorted] - recipeA[valueToBeSorted]);
      props.sortRecipesDescending(sortedRecipes, valueToBeSorted.toUpperCase());
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Sort Recipes </InputLabel>
        <Select
          LabelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={sortLabel}
          renderValue={(value) => value}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value={{ sortValue: 'time_to_cook_in_minutes', order: 'ascending' }}>Time to cook (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'time_to_cook_in_minutes', order: 'descending' }}>Time to cook (descending)</MenuItem>
          <MenuItem value={{ sortValue: 'calories', order: 'ascending' }}>Calories (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'calories', order: 'descending' }}>Calories (descending)</MenuItem>
          <MenuItem value={{ sortValue: 'servings', order: 'ascending' }}>Servings (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'servings', order: 'descending' }}>Servings (descending)</MenuItem>
          <MenuItem value={{ sortValue: 'protein', order: 'ascending' }}>Protein (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'protein', order: 'descending' }}>Protein (descending)</MenuItem>
          <MenuItem value={{ sortValue: 'carbs', order: 'ascending' }}>Carbs (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'carbs', order: 'descending' }}>Carbs (descending)</MenuItem>
          <MenuItem value={{ sortValue: 'fat', order: 'ascending' }}>Fat (ascending)</MenuItem>
          <MenuItem value={{ sortValue: 'fat', order: 'descending' }}>Fat (descending)</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setSortLabel("");
          props.clearRecipeSortFilter();
        }}
        className={classes.undoSortButton}
      >
        Undo Sort
        </Button>
    </div>
  );
};

SortRecipesDropDown.propTypes = {
  data: PropTypes.object,
  sortRecipesAscending: PropTypes.func,
  sortRecipesDescending: PropTypes.func,
  clearRecipeSortFilter: PropTypes.func
};

const mapStateToProps = (state) => ({ data: state.recipes });

const mapDispatchToProps = (dispatch) => {
  return {
    sortRecipesAscending: (sortedRecipes, valueToBeSorted) => {
      dispatch({
        type: `SORT_BY_${valueToBeSorted}_ASCENDING`,
        sortedRecipes: sortedRecipes
      });
    },
    sortRecipesDescending: (sortedRecipes, valueToBeSorted) => {
      dispatch({
        type: `SORT_BY_${valueToBeSorted}_DESCENDING`,
        sortedRecipes: sortedRecipes
      });
    },
    clearRecipeSortFilter: () => {
      dispatch({
        type: "CLEAR_RECIPE_SORT_FILTER",
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortRecipesDropDown);
