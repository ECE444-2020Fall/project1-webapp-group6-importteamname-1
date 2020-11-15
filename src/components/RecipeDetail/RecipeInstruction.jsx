import React from "react";
import PropTypes from 'prop-types';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const RecipeInstruction = (props) => {
  let parsedInstructions = props.instructions.split(",");


  return (
    <div>
        <div style={{
          display: 'flex',
        }}>
          <AccessTimeIcon />
          <p>Time to cook: {props.timeToCookInMinutes} minutes</p>
        </div>

        <h5>Instruction:</h5>

        <List dense={true}>              
          {parsedInstructions
          .slice(1, parsedInstructions.length - 1)
          .map(instructionStep => (
            <ListItem>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary={instructionStep}
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