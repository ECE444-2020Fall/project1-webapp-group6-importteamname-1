import React from "react";
import { Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { FavouritesButton } from "../FavouritesButton";
import { RecipeCartButton } from "../RecipeCartButton";
import { UserRating } from "../UserRating";
import PropTypes from 'prop-types';

const RecipeCardUserActions = (props) => {

  return (
     <div> 
        <CardActions>
          <CardContent>
            <Typography >
                <UserRating recipe_id={props.recipe_id} />
            </Typography>
          </CardContent>
        </CardActions>   
        <CardActions>
          <RecipeCartButton recipe_id={props.recipe_id} />
          <FavouritesButton recipe_id={props.recipe_id} />
        </CardActions>
    </div>
  );
}

RecipeCardUserActions.propTypes = {
    recipe_id: PropTypes.string
};

export default RecipeCardUserActions;
