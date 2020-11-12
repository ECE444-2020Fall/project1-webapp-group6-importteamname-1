import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import postReducer from './postReducer';

export default combineReducers({
    recipes: recipeReducer,
    // posts: postReducer
})