import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import AddRecipes from "./components/AddRecipes/AddRecipes";

import RecipeSearchResults from "./components/RecipeSearchResults/RecipeSearchResults";

import RecipeDetail from "./components/RecipeDetail/RecipeDetail";

import FavouriteRecipes from "./components/FavouriteRecipes/FavouriteRecipes";

import CalorieTracker from "./components/CalorieTracker/CalorieTracker";

import RecipeCart from "./components/RecipeCart/RecipeCart";

import Login from "./components/Login/Login";

import Register from "./components/Login/Register";

import Welcome from "./components/Login/Welcome"

import RouteToLogin from "./components/Login/RouteToLogin"

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path = "/AddRecipes" component = { AddRecipes } />
          <Route path = "/RecipeSearchResults" component = { RecipeSearchResults } />
          <Route path = "/RecipeDetail" component = { RecipeDetail } />
          <Route path = "/FavouriteRecipes" component = { FavouriteRecipes } />
          <Route path = "/CalorieTracker" component = { CalorieTracker } />
          <Route path = "/RecipeCart" component = { RecipeCart } />
          <Route path = "/welcome" component = { Welcome } />
          <Route path = "/Login" component = { Login } />
          <Route path = "/Register" component = { Register } />
          <Route exact path = "/" component = { RouteToLogin } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
