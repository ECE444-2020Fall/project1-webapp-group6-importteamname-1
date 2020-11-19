/**
 * FileName: index.js
 *
 * Description: This file is used to export reducers. 
 *
 * Author(s): Tim Fei
 * Date: November 17, 2020 
 */

import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';

export default combineReducers({
    recipes: recipeReducer,
});