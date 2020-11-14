import React from "react";
import PropTypes from 'prop-types';

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
  
NutritionFacts.propTypes = {
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fat: PropTypes.number,
};

  export default NutritionFacts;