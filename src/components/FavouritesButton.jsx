import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {addItem, removeItem, getItem} from '../utils/list_utils';
import CONSTANTS from "../constants";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: 225,
    height: 45
  },
}));

const FavouritesButton = ({recipe_id}) => {
  const classes = useStyles();
  const [isFavourite, setIsFavourite] = useState(false);
  const [refresh, setRefresh] = useState(true)

  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST)
    .then((res) => {
      if (res.item) {
        setIsFavourite(true)
      } else {
        setIsFavourite(false)
      }
    })
  }  

  return (
    <Button
      variant="contained"
      color={ isFavourite ? "secondary" : "action"}
      className={classes.button}
      startIcon={<FavoriteBorderIcon/>}
      onClick={() => {
        console.log("CLICK")
        isFavourite ? removeItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST) : addItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST)
        setIsFavourite(!isFavourite)
      }
    }
    >
      {isFavourite ? "Unfavourite" : "Favourite"}
    </Button>
  )
}

FavouritesButton.propTypes = {
  recipe_id: PropTypes.amy,
};

export { FavouritesButton };