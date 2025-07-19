import {
    GET_RECIPES,
    GET_RECIPES_DETAIL,
    GET_BY_DIET,
    SORT_RECIPE,
    CLEAN_DETAIL,
    CLEAN_FILTER,
    SET_ERROR
} from "../actions/index";

const initialState = {
    recipes: [],
    recipeDetail: [],
    recipesFilter: [],
    error: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                error: null
            };

        case GET_RECIPES_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
                error: null
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                recipes: [],
                recipesFilter: []
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                recipeDetail: []
            };

        case CLEAN_FILTER:
            return {
                ...state,
                recipesFilter: []
            };

        case GET_BY_DIET:{
            function filtro(busqueda, diets) {
                let existe = false;
                for (const diet of diets) {
                    if (diet.name === busqueda) {
                        existe = true;
                        break;
                    }
                }
                return existe;
            }

            function filtrado(busqueda) {
                return state.recipes.filter((receta) => {
                    return filtro(busqueda, receta.diets);
                });
            }

            return {
                ...state,
                recipesFilter: filtrado(action.payload)
            };
        }
        
        case SORT_RECIPE:{
            const myData = [...state.recipes];
            const myData2 = [...state.recipesFilter];

            const ordenar = (array, tipo) => {
                return array.sort((a, b) => {
                    if (a.title > b.title) return tipo === "asc" ? 1 : -1;
                    if (b.title > a.title) return tipo === "asc" ? -1 : 1;
                    return 0;
                });
            };

            return {
                ...state,
                recipes: ordenar(myData, action.payload),
                recipesFilter: ordenar(myData2, action.payload)
            };
        }
        default:
            return { ...state };
    }
}
