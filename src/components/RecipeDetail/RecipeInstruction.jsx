import React from "react";
import PropTypes from 'prop-types';

const RecipeInstruction = (props) => {
  return (
    <div>
        <h3>Instruction:</h3>
        <p>Time to cook: {props.timeToCookInMinutes} minutes</p>
        <p>{props.instructions}</p>
    </div>
  );
}

RecipeInstruction.propTypes = {
  timeToCookInMinutes: PropTypes.number,
  instructions: PropTypes.string,
};

export default RecipeInstruction;