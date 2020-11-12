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