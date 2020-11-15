import React from "react";
import PropTypes from 'prop-types';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  alignItemsAndJustifyContent: {
    display: 'flex',
    flexDirection: 'vertical',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const RecipeInstruction = (props) => {
  let parsedInstructions = props.instructions.split("',");
  const classes = useStyles()

  return (
    <div className={classes.alignItemsAndJustifyContent}>
        <List dense={true} >
            <h5>Instruction:</h5>
            <ListItem className={classes.alignItemsAndJustifyContent}>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Time to cook: ' + props.timeToCookInMinutes + ' minutes'}
                variant="h3"
              />
            </ListItem>              
          {parsedInstructions
          .slice(1, parsedInstructions.length-1)
          .map((instructionStep, instructionIndex) => (
            <ListItem key={instructionIndex}>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText
                primary={instructionStep.substr(2, instructionStep.length)}
              />
            </ListItem>
          ))}
        </List>
    </div>
  );
}

RecipeInstruction.propTypes = {
  timeToCookInMinutes: PropTypes.number,
  instructions: PropTypes.string,
};

export default RecipeInstruction;