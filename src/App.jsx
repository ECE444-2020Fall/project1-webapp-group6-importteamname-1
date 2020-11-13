import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './pages/NavBar';
import AddIngredients from './pages/AddIngredients/AddIngredients';
import RecipeSearchResults from './pages/RecipeSearchResults/RecipeSearchResults';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import FavouriteRecipes from './pages/FavouriteRecipes/FavouriteRecipes';
import ShoppingList from './pages/ShoppingList/ShoppingList';
import CalorieTracker from './pages/CalorieTracker/CalorieTracker';
import RecipeCart from './pages/RecipeCart/RecipeCart';
import ScrollIntoView from './components/common/ScrollIntoView';
import { connect } from 'react-redux'; 
import { getRecipes } from './actions/recipeActions';
import PropTypes from 'prop-types';

const App = (props) => {
  useEffect(() => {
    props.getRecipes()
  }, []);

  return (
    <React.Fragment>
      <ScrollIntoView>
        <NavBar />
        <Switch>
          <Route exact path='/' component={AddIngredients} />
          <Route exact path='/favourite-recipes' component={FavouriteRecipes} />
          <Route exact path='/shopping-list' component={ShoppingList} />
          <Route exact path='/calorie-tracker' component={CalorieTracker} />
          <Route exact path='/recipe-cart' component={RecipeCart} />
          <Route exact path='/recipe-search-results/:recipe_id' component={RecipeDetail} />
          <Route exact path='/recipe-search-results' component={RecipeSearchResults} />
        </Switch>
        </ScrollIntoView>
    </React.Fragment>
  );
}

App.propTypes = {
  data: PropTypes.object,
  getRecipes: PropTypes.object
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecipes})(App);
