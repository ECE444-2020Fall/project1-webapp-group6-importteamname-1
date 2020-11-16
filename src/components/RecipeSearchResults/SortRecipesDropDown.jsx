import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'; 
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7f7f7',
  },
  undoSortButton: {
    marginTop: 20,
    marginRight: 50
  },
  formControl: {
    marginTop: 30,
    minWidth: 200,
    marginRight: 50
  },
}));

const SortRecipesDropDown = (props) => {
  const classes = useStyles();
  const [sortDescription, setSortDescription] = React.useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.clearRecipeSortFilter();
  }, []);

  const handleChange = (event) => {    
    let recipesToBeSorted = null;
    let sortedRecipes = null;
    let sortOrder = event.target.value.order;
    let valueToBeSorted = event.target.value.sortValue;
    let sortDescription = event.target.value.sortDescription;

    recipesToBeSorted = props.data.sortedRecipes && props.data.sortedRecipes.length == 0 ? [...props.data.recipes] : props.data.sortedRecipes;
    
    if (sortOrder === "descending") {
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeA[valueToBeSorted] - recipeB[valueToBeSorted]);
      props.sortRecipesAscending(sortedRecipes, valueToBeSorted.toUpperCase());
      console.log(sortDescription);
      setSortDescription({sortDescription: event.target.value.sortDescription});
      console.log(sortDescription);
    } else { 
      sortedRecipes = recipesToBeSorted.sort((recipeA, recipeB) => recipeB[valueToBeSorted] - recipeA[valueToBeSorted]);
      props.sortRecipesDescending(sortedRecipes, valueToBeSorted.toUpperCase());
      setSortDescription(sortDescription);
    } 
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div className={classes.root}>
      <Grid container justify="flex-end">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Sort Recipes by:</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={sortDescription}
            onChange={handleChange}
          >
            <MenuItem value={{sortValue: 'time_to_cook_in_minutes', order: 'ascending', sortDescription: 'Time to cook (ascending)'}}>Time to cook (ascending)</MenuItem>
            <MenuItem value={{sortValue: 'time_to_cook_in_minutes', order: 'descending', sortDescription: ''}}>Time to cook (descending)</MenuItem>
            <MenuItem value={{sortValue: 'calories', order: 'ascending', sortDescription: 'Time to cook (descending)'}}>Calories (ascending)</MenuItem>
            <MenuItem value={{sortValue: 'calories', order: 'descending', sortDescription: 'Calories (descending)'}}>Calories (descending)</MenuItem>
            <MenuItem value={{sortValue: 'servings', order: 'ascending', sortDescription: 'Servings (ascending)'}}>Servings (ascending)</MenuItem>
            <MenuItem value={{sortValue: 'servings', order: 'descending', sortDescription: 'Servings (descending)'}}>Servings (descending)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container justify="flex-end">
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => props.clearRecipeSortFilter()}
          className={classes.undoSortButton}
        >
          Undo Sort
        </Button>
      </Grid>
    </div>
  );
}

SortRecipesDropDown.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(SortRecipesDropDown);
