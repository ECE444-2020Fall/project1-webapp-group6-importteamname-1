import React from 'react';

import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './pages/NavBar';

import AddRecipes from './pages/AddRecipes/AddRecipes';

import RecipeSearchResults from './pages/RecipeSearchResults/RecipeSearchResults';

import RecipeDetail from './pages/RecipeDetail/RecipeDetail';

import FavouriteRecipes from './pages/FavouriteRecipes/FavouriteRecipes';

import ShoppingList from './pages/ShoppingList/ShoppingList';

import CalorieTracker from './pages/CalorieTracker/CalorieTracker';

import RecipeCart from './pages/RecipeCart/RecipeCart';

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={AddRecipes} />
        <Route path='/RecipeSearchResults' component={RecipeSearchResults} />
        <Route path='/RecipeDetail/:recipe_id' component={RecipeDetail} />
        <Route path='/FavouriteRecipes' component={FavouriteRecipes} />
        <Route path='/ShoppingList' component={ShoppingList} />
        <Route path='/CalorieTracker' component={CalorieTracker} />
        <Route path='/RecipeCart' component={RecipeCart} />
      </Switch>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
