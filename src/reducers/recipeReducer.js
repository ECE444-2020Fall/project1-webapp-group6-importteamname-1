/**
 * FileName: recipeReducer.js
 *
 * Description: This file contains the reducer used for receiving actions and updating the app's 
 * recipe state.
 *
 * Author(s): Tim Fei
 * Date: November 17, 2020 
 */

const initialState = {
    recipes: [],
    sortedRecipes: [],
    sortOrder: '',
    paginationCounter: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
            };
        case 'GET_RECOMMENDED_RECIPES':
            return {
                ...state,
                recipes: action.recommendedRecipes
            };
        case 'SORT_BY_CALORIES_ASCENDING':
        case 'SORT_BY_SERVINGS_ASCENDING':
        case 'SORT_BY_PROTEIN_ASCENDING':
        case 'SORT_BY_CARBS_ASCENDING':
        case 'SORT_BY_FAT_ASCENDING':
        case 'SORT_BY_TIME_TO_COOK_IN_MINUTES_ASCENDING':
            return {
                ...state,
                sortedRecipes: action.sortedRecipes,
                sortOrder: 'ascending'
            };
        case 'SORT_BY_CALORIES_DESCENDING':
        case 'SORT_BY_SERVINGS_DESCENDING':
        case 'SORT_BY_PROTEIN_DESCENDING':
        case 'SORT_BY_CARBS_DESCENDING':
        case 'SORT_BY_FAT_DESCENDING':
        case 'SORT_BY_TIME_TO_COOK_IN_MINUTES_DESCENDING':
            return {
                ...state,
                sortedRecipes: action.sortedRecipes,
                sortOrder: 'descending'
            };
        case 'CLEAR_RECIPE_SORT_FILTER':
            return {
                ...state,
                sortedRecipes: []
            };
        case 'CLEAR_RECIPES':
            return {
                ...state,
                recipes: [],
                sortedRecipes: []
            };
        case 'RENDER_PAGINATION':
            return {
                ...state,
                paginationCounter: initialState.paginationCounter + 1
            };
        default:
            return state;
    }
}