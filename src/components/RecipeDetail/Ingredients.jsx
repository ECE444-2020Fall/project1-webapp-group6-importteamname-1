/**
 * FileName: Ingredients.jsx
 *
 * Description: This panel displays a list of ingredients needed for a recipe.
 * 
 * Author(s): Tim Fei
 * Date: November 17, 2020 
 */

import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EcoIcon from '@material-ui/icons/Eco';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  listContainer: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'vertical',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  grid: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Ingredients = (props) => {
  const classes = useStyles();
  let recipeServings = null;
  let recipeIngredients = null;

  if (props.ingredientsList.ingredients) {
    recipeServings =
      <Grid className={classes.grid} container>
        <Grid className={classes.grid} item xs={12} md={6}>
          <Typography fontWeight={500} variant="h7" className={classes.title}>
            <h5>Servings:</h5>
          </Typography>
          <div className={classes.listContainer}>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText
                  primary={(props.servings) + (props.servings > 1 ? ' meals' : ' meal')}
                />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>;

    recipeIngredients =
      <Grid className={classes.grid} container>
        <Grid className={classes.grid} item xs={12} md={6}>
          <Typography fontWeight={500} variant="h7" className={classes.title}>
            <h5>Ingredients:</h5>
          </Typography>
          <div className={classes.listContainer}>
            <List dense={true}>
              {props.ingredientsList.ingredients.map(ingredient => (
                <ListItem key={ingredient.recipe_id + ingredient.recipe_name}>
                  <ListItemIcon>
                    <EcoIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={ingredient.ingredient_name}
                    secondary={`(${ingredient.amount} ${ingredient.unit_of_measurement})`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>;
  } else {
    recipeIngredients = <p>No Ingredients.</p>;
  }

  return (
    <div>
      {recipeServings}
      <br></br>
      {recipeIngredients}
    </div>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.object,
  ingredientsList: PropTypes.object,
  servings: PropTypes.number
};

export default Ingredients;