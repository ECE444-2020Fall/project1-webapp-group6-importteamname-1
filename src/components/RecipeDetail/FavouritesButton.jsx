/**
 * FileName: FavouritesButton.jsx
 *
 * Description: The user can use this button to favourite/unfavourite a recipe.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */

import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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

const FavouritesButton = ({ recipe_id }) => {
  const classes = useStyles();

  const [isFavourite, setIsFavourite] = useState(false);
  const [refresh, setRefresh] = useState(true);

  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST)
      .then((res) => {
        setIsFavourite((res.item) ? true : false);
      });
  }

  return (
    <Button
      variant="contained"
      size="small"
      color={isFavourite ? "secondary" : "action"}
      className={classes.button}
      startIcon={<FavoriteBorderIcon />}
      onClick={() => {
        isFavourite ? removeItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST) : addItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST);
        setIsFavourite(!isFavourite);
      }
      }
    >
      {isFavourite ? "Unfavourite" : "Favourite"}
    </Button>
  );
};

FavouritesButton.propTypes = {
  recipe_id: PropTypes.string
};


export { FavouritesButton };