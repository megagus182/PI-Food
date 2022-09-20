import { GET_RECIPES, GET_RECIPES_DETAIL, ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/index"

const initialState = {
    recipes: [],
    recipeDetail: [],
    favorites: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case GET_RECIPES_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(e => {
                    return e.id !== action.payload
                })
            }
        default: return { ...state }
    }
}
