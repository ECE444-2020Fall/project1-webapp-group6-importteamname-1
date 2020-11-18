﻿import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './pages/NavBar';
import AddIngredients from './pages/AddIngredients/AddIngredients';
import RecipeSearchResults from './pages/RecipeSearchResults/RecipeSearchResults';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import FavouriteRecipes from './pages/FavouriteRecipes/FavouriteRecipes';
import ShoppingList from './pages/ShoppingList/ShoppingList';
import RecipeCart from './pages/RecipeCart/RecipeCart';
import { connect } from 'react-redux';
import { getRecipes } from './actions/recipeActions';
import PropTypes from 'prop-types';
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Welcome from "./pages/Login/Welcome";
import RouteToLogin from "./pages/Login/RouteToLogin";
import Profile from "./pages/Login/Profile";
import Footer from "./pages/Footer";
import Pantry from './pages/Pantry/Pantry';
import ScrollIntoView from './components/common/ScrollIntoView';

const App = () => {
  useEffect(() => {
  }, []);
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={["/", "/Login", "/Register"]} component={LoginContainer} />
        <Route component={defaultContainer} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

const LoginContainer = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={RouteToLogin} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
    </React.Fragment>
  );
};

const defaultContainer = () => {
  return (
    <React.Fragment>
      <ScrollIntoView>
        <NavBar />
        <Route path="/AddIngredients" component={AddIngredients} />
        <Route path="/RecipeSearchResults" component={RecipeSearchResults} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/Profile" component={Profile} />
        <Route exact path='/pantry' component={Pantry} />
        <Route exact path='/favourite-recipes' component={FavouriteRecipes} />
        <Route exact path='/shopping-list' component={ShoppingList} />
        <Route exact path='/recipe-cart' component={RecipeCart} />
        <Route exact path='/recipe-search-results/:recipe_id' component={RecipeDetail} />
        <Route exact path='/recipe-search-results' component={RecipeSearchResults} />
      </ScrollIntoView>
    </React.Fragment>
  );
};

App.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.func
};

const mapStateToProps = (state) => ({ data: state.recipes });

export default connect(mapStateToProps, { getRecipes })(App);

