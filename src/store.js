/**
 * FileName: store.js
 *
 * Description: This file contains code that defines the Redux store.
 *
 * Author: Tim Fei
 * Date: November 17, 2020 
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const middleware = [thunk];
const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(throttle(() => {
  saveState({
    recipes: store.getState().recipes
  });
}, 1000));

export default store;