import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import AddRecipes from "./components/AddRecipes/AddRecipes";

import RecipeSearchResults from "./components/RecipeSearchResults/RecipeSearchResults";

import RecipeDetail from "./components/RecipeDetail/RecipeDetail";

import FavouriteRecipes from "./components/FavouriteRecipes/FavouriteRecipes";

import ShoppingList from "./components/ShoppingList/ShoppingList";

import CalorieTracker from "./components/CalorieTracker/CalorieTracker";

import RecipeCart from "./components/RecipeCart/RecipeCart";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = { AddRecipes } />
          <Route path = "/RecipeSearchResults" component = { RecipeSearchResults } />
          <Route path = "/RecipeDetail" component = { RecipeDetail } />
          <Route path = "/FavouriteRecipes" component = { FavouriteRecipes } />
          <Route path = "/ShoppingList" component = { ShoppingList } />
          <Route path = "/CalorieTracker" component = { CalorieTracker } />
          <Route path = "/RecipeCart" component = { RecipeCart } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
