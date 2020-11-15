import React from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { FavouritesButton } from "../RecipeDetail/FavouritesButton";
import { RecipeCartButton } from "../RecipeDetail/RecipeCartButton";
import { UserRating } from "../RecipeDetail/UserRating";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";

const RecipeCardUserActions = (props) => {
  return (
     <div> 
        <Card>
          <CardActions>
            <CardContent>
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
