import { GET_RECIPES, GET_RECIPES_DETAIL, GET_BY_DIET, REMOVE_FAVORITE } from "../actions/index"

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
        case GET_BY_DIET:
            const filtro = state.recipes.filter(d => {
                console.log(filtro)
                return d.diets.length>1
            })
            return {
                ...state,
                recipes: filtro
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
