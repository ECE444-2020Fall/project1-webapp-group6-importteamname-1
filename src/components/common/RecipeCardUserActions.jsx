import React from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import { FavouritesButton } from "../RecipeDetail/FavouritesButton";
import { RecipeCartButton } from "../RecipeDetail/RecipeCartButton";
import { UserRating } from "../RecipeDetail/UserRating";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(() => ({
  cardAction: {
    width: 500,
    height: 70,
    marginBottom: 30
  },
  cardContent: {
    width: 500,
    height: 20,
  }
}));

const RecipeCardUserActions = (props) => {
  const classes = useStyles();

  return (
     <div> 
        <Card>
          <CardActions className={classes.cardAction}>
            <CardContent className={classes.cardContent}>
              <UserRating recipe_id={props.recipe_id} />
            </CardContent>
          </CardActions>   
          <CardActions>
            <RecipeCartButton recipe_id={props.recipe_id} />
            <FavouritesButton recipe_id={props.recipe_id} />
          </CardActions>
        </Card>
    </div>
  );
}

RecipeCardUserActions.propTypes = {
    recipe_id: PropTypes.string
};

export default RecipeCardUserActions;
