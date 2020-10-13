import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Add_Recipes from "./components/Add_Recipes/Add_Recipes";

import Recipe_Search_Results from "./components/Recipe_Search_Results/Recipe_Search_Results";

import Recipe_Detail from "./components/Recipe_Detail/Recipe_Detail";

import Favourite_Recipes from "./components/Favourite_Recipes/Favourite_Recipes";

import Track_Calories from "./components/Track_Calories/Track_Calories";

import Recipe_Cart from "./components/Recipe_Cart/Recipe_Cart";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = { Add_Recipes } />
          <Route path = "/Recipe_Search_Results" component = { Recipe_Search_Results } />
          <Route path = "/Recipe_Detail" component = { Recipe_Detail } />
          <Route path = "/Favourite_Recipes" component = { Favourite_Recipes } />
          <Route path = "/Track_Calories" component = { Track_Calories } />
          <Route path = "/Recipe_Cart" component = { Recipe_Cart } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
