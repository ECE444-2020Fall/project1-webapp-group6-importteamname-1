import axios from 'axios';
import CONSTANTS from '../constants';

export const getRecipes = () => async dispatch => {
    try {
        const res = await axios.get(CONSTANTS.ENDPOINT.GET_ALL_RECIPES);
        dispatch({
            type: 'GET_ALL_RECIPES',
            payload: res.data.recipes
        })
    }
    catch (e) {
        dispatch({
            type: 'GET_ALL_RECIPES_ERROR',
            payload: console.log(e)
        })
    }
}