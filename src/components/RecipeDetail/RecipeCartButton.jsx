/**
 * FileName: RecipeCartButton.jsx
 *
 * Description: The user can use this button to add a recipe to RecipeCart and remove a recipe from RecipeCart.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */


import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addItem, removeItem, getItem } from '../../utils/list_utils';
import CONSTANTS from "../../constants";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: 225,
    height: 45
  },
}));

const RecipeCartButton = ({ recipe_id }) => {
  const classes = useStyles();

  const [isCarted, setIsCarted] = useState(false);
  const [refresh, setRefresh] = useState(true);

  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART)
      .then((res) => {
        setIsCarted((res.item) ? true : false);
      });
  }

  return (
    <Button
      variant="contained"
      size="small"
      color={isCarted ? "primary" : "action"}
      className={classes.button}
      startIcon={<ShoppingCartIcon />}
      onClick={() => {
        isCarted ? removeItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART) : addItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART);
        setIsCarted(!isCarted);
      }
      }
    >
      {isCarted ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};

RecipeCartButton.propTypes = {
  recipe_id: PropTypes.string
};


export { RecipeCartButton };