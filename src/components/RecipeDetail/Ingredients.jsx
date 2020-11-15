import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  grid: {
    width: '100%'
  }
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
          <h6>Servings:</h6>
          </Typography>
          <div className={classes.demo}>
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
      </Grid>

    recipeIngredients = 
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography fontWeight={500} variant="h7" className={classes.title}>
            <h6>Ingredients:</h6>
          </Typography>
          <div className={classes.demo}>
            <List dense={true}>              
        
            {props.ingredientsList.ingredients.map(ingredient => (
              <ListItem>
                <ListItemIcon>
                  <EcoIcon />
                </ListItemIcon>
                <ListItemText
                  primary={ingredient.ingredient_name}
                  secondary={'(' + ingredient.amount + ' ' + ingredient.unit_of_measurement + ')'}
                />
              </ListItem>
            ))}
            </List>
          </div>
        </Grid>
      </Grid>
  } else {
    recipeIngredients = <p>No Ingredients.</p>
  }
  
  return (
    <div>
        {recipeServings}
        <br></br>
        {recipeIngredients}
    </div>
    );
  }
  
  Ingredients.propTypes = {
    ingredients: PropTypes.object,
    ingredientsList: PropTypes.object,
    servings: PropTypes.number
  };

  export default Ingredients;