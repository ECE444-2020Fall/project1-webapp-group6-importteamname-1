const initialState = {
    recipes: [],
    loading: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        default: return state
    }
}