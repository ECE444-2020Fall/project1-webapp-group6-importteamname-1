import React from "react";
import Box from '@material-ui/core/Box'; 

const TrackCalories = () => {
  return <main id="mainContent">
    <div className="container">
      <div className="row justify-content-center mt-5 p-0">
        <h3>Track Calories</h3>
      </div>
      <Box>
        <Box height={1/3} width={1/4} fontSize={18} fontStyle="italic" fontWeight={600} textAlign="center">
          Spaghetti Bolognese
          <img src ="https://supervalu.ie/thumbnail/720x400/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg?fill=1"
            height = '100%'
            width = '100%'
          /> 
        </Box>
        <Box height={1/3} width={1/4} textAlign="center" style= {{color: '#777778'}}>
          <div > Calories: 490 kcals </div>
          <div> Protein: 36 grams </div>
          <div> Carbs: 55 grams </div>
          <div> Fats: 12 grams </div>  
          
        </Box>
      </Box>
    </div>
  </main>;
}
export default TrackCalories;
