import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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

const FavouritesButton = () => {
  const classes = useStyles();
  const { recipe_id } = useParams();

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
        isFavourite ? removeItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST) : addItem(recipe_id, CONSTANTS.ENDPOINT.FAVOURITES_LIST)
        setIsFavourite(!isFavourite)
      }
    }
    >
      {isFavourite ? "Unfavourite" : "Favourite"}
    </Button>
  )
}


export { FavouritesButton };