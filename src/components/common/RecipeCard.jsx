import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import RecipeCardUserActions from './RecipeCardUserActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 20
    },
    grid: {
      width: '100%',
      margin: '0px'
    },
    leftColumn: {
      marginLeft: 50
    },
    recipePaper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: 'black',
      marginBottom: 20,
    },
    cardMedia: {
      width: 500
    },
    cardContent: {
      width: 500,
      height: 120
    }
  }));

const RecipeCard = (props) => {
    const classes = useStyles();

  return (
    <div className={classes.root}> 
           <Card>
              <CardActionArea>
              <Link key={props.recipeId} to={`recipe-search-results/${props.recipeId}`}>
                <CardMedia
                  component="img"
                  alt="imageUnavailable"
                  height="280"
                  image= {props.imageUrl}
                  className={classes.cardMedia}
                />
                <CardContent className={classes.cardContent}>
                  <Typography color="textPrimary" gutterBottom variant="h5" component="h3">
                    {props.recipeName} 
                  </Typography>
                  <Typography color="textPrimary" component="p">
                    {props.calories} Calories 
                  </Typography>
                </CardContent>
                </Link>
              </CardActionArea>
              <RecipeCardUserActions recipe_id={props.recipeId} />
            </Card>
    </div>
  );
}

RecipeCard.propTypes = {
    imageUrl: PropTypes.string,
    recipeName: PropTypes.string,
    recipeId: PropTypes.string,
    timeToCookInMinutes: PropTypes.number,
    calories: PropTypes.number,
    servings: PropTypes.number
};

export default RecipeCard;
