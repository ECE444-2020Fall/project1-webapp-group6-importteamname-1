/**
 * FileName: recipeActions.js
 *
 * Description: This file contains Redux actions dispatchers for retrieving recipes from the back-end
 *
 * Author: Tim Fei
 * Date: November 17, 2020 
 */

import CONSTANTS from '../constants';

export const getRecipes = () => async dispatch => {
    try {
        await fetch(CONSTANTS.ENDPOINT.GET_ALL_RECIPES)
            .then(response => response.json())
            .then(json =>{
                dispatch({
                    type: 'GET_ALL_RECIPES',
                    payload: json.recipes
            })
        })
    }
    catch (e) {
        dispatch({
            type: 'GET_ALL_RECIPES_ERROR',
            payload: console.log(e)
        })
    }
}

export const getRecommendedRecipes = () => async dispatch => {
    try {
        await fetch(CONSTANTS.ENDPOINT.PANTRY_RECIPES, {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(json =>{                     
            dispatch({
                type: 'GET_RECOMMENDED_RECIPES',
                recommendedRecipes: json.recipes
            })          
        })
    }
    catch (e) {
        dispatch({
            type: 'GET_RECOMMENDED_RECIPES',
            recommendedRecipes: console.log(e)
        })
    }
}

export const clearRecipes = () => async dispatch => {
    dispatch({
        type: 'CLEAR_RECIPES',
    })  
}