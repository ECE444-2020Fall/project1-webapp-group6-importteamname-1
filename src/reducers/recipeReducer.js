const initialState = {
    recipes: [],
    sortOrder: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
            }
        case 'SORT_TIME_TO_COOK_ASCENDING':
            return {
                ...state,
                recipes: action.sortedRecipesByTimeToCookAscending,
                sortOrder: 'ascending'
            }
        case 'SORT_TIME_TO_COOK_DESCENDING':
            return {
                ...state,
                recipes: action.sortedRecipesByTimeToCookDescending,
                sortOrder: 'descending'
            }
        default: return state
    }
}