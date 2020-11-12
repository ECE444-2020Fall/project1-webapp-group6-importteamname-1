import React from "react";

const RecipeInstruction = (props) => {
    
    return (
      <div>
          <h3>Instruction:</h3>
          <p>Time to cook: {props.timeToCookInMinutes} minutes</p>
          <p>{props.instructions}</p>
      </div>
    );
  }
  
  export default RecipeInstruction;