import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {addItem, removeItem, getItem} from '../../utils/list_utils';
import CONSTANTS from "../../constants";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: 225,
    height: 45
  },
}));

const RecipeCartButton = () => {
  const classes = useStyles();
  const { recipe_id } = useParams();

  const [isCarted, setIsCarted] = useState(false);
  const [refresh, setRefresh] = useState(true)

  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART)
    .then((res) => {
      if (res.item) {
        setIsCarted(true)
      } else {
        setIsCarted(false)
      }
    })
  }  

  return (
    <Button
      variant="contained"
      color={ isCarted ? "primary" : "action"}
      className={classes.button}
      startIcon={<ShoppingCartIcon/>}
      onClick={() => {
        isCarted ? removeItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART) : addItem(recipe_id, CONSTANTS.ENDPOINT.RECIPE_CART)
        setIsCarted(!isCarted)
      }
    }
    >
      {isCarted ? "Remove from Cart" : "Add to Cart"}
    </Button>
  )
}

export { RecipeCartButton };