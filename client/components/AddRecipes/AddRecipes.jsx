import React from "react";
import Button from '@material-ui/core/Button';

const AddRecipes = () => {
  return <main id="mainContent">
    <div className="container">
      <div className="row justify-content-center mt-5 p-0">
        <h3>Add Recipes</h3>
      </div>
      <Button variant="contained" color="primary">
          Sample Button
      </Button>
    </div>
  </main>;
}
export default AddRecipes;
