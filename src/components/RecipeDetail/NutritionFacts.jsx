import React from "react";

const NutritionFacts = (props) => {
    
    return (
      <div>
        Nutrition Facts:
        <p>Calories: {props.calories} </p>
        <p>Protein: {props.protein} </p>
        <p>Carbs: {props.carbs}</p>
        <p>Fat: {props.fat}</p>
      </div>
    );
  }
  
  export default NutritionFacts;