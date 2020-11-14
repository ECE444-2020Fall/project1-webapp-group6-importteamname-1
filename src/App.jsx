import React from 'react';

import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './pages/NavBar';

import Footer from './pages/Footer';

import AddRecipes from './pages/AddRecipes/AddRecipes';

import RecipeSearchResults from './pages/RecipeSearchResults/RecipeSearchResults';

import RecipeDetail from './pages/RecipeDetail/RecipeDetail';

import FavouriteRecipes from './pages/FavouriteRecipes/FavouriteRecipes';

import ShoppingList from './pages/ShoppingList/ShoppingList';

import CalorieTracker from './pages/CalorieTracker/CalorieTracker';

import RecipeCart from './pages/RecipeCart/RecipeCart';

import Login from "./pages/Login/Login";

import Register from "./pages/Login/Register";

import Welcome from "./pages/Login/Welcome";

import RouteToLogin from "./pages/Login/RouteToLogin";

import Profile from "./pages/Login/Profile";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path={["/", "/Login", "/Register"]} component={LoginContainer} />
          <Route component={defaultContainer} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

const LoginContainer = () => {
  return (
  <React.Fragment>
    <Route exact path = "/" component = {RouteToLogin} />
    <Route path = "/Login" component = {Login} />
    <Route path = "/Register" component = {Register} />
  </React.Fragment>
  )
}
  
const defaultContainer = () => {
  return (
  <React.Fragment>
    <NavBar />
    <Route path = "/AddRecipes" component = {AddRecipes} />
    <Route path = "/RecipeSearchResults" component = {RecipeSearchResults} />
    <Route path = "/welcome" component = {Welcome} />
    <Route path = "/Profile" component = {Profile} />
    <Route exact path='/favourite-recipes' component={FavouriteRecipes} />
    <Route exact path='/shopping-list' component={ShoppingList} />
    <Route exact path='/calorie-tracker' component={CalorieTracker} />
    <Route exact path='/recipe-cart' component={RecipeCart} />
    <Route exact path='/recipe-search-results/:recipe_id' component={RecipeDetail} />
    <Route exact path='/recipe-search-results' component={RecipeSearchResults} />
  </React.Fragment>
  )

}


export default App;

          