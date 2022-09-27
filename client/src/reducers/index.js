import { GET_RECIPES, GET_RECIPES_DETAIL, GET_BY_DIET, SORT_RECIPE } from "../actions/index"

const initialState = {
    recipes: [],
    recipeDetail: [],
    recipesFilter: []
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
            function filtro(busqueda, diets) { //funcion para si existe o no en el arreglo la dieta
                let existe = false;
                for (const dieta of diets) {
                    if (dieta.name === busqueda) {
                        existe = true;
                        break;
                    }
                }
                return existe;
            }

            function filtrado(busqueda) { //si existe la dieta en el arreglo me la trae
                return state.recipes.filter((receta) => {
                    return filtro(busqueda, receta.diets);
                });
            }
            return {
                ...state,
                recipesFilter: filtrado(action.payload) //modifico el estado dependiendo de la dieta elegida
            }
        case SORT_RECIPE:
            const myData = [].concat(state.recipes)
            const myData2 = [].concat(state.recipesFilter)
            let aux = action.payload === "asc"?
///Ordenar las recetas principales
            myData.sort(function (a,b){
                    if (a.title > b.title) {
                        return 1
                    }
                    if (b.title > a.title) {
                        return -1
                    }
                    return 0
                }) : 
                myData.sort(function (a,b){
                    if (a.title > b.title) {
                        return -1
                    }
                    if (b.title > a.title) {
                        return 1
                    }
                    return 0
                })
                //Ordenar las recetas filtradas
                let aux2 = action.payload === "asc"?
                myData2.sort(function (a,b){
                    if (a.title > b.title) {
                        return 1
                    }
                    if (b.title > a.title) {
                        return -1
                    }
                    return 0
                }) : 
                myData2.sort(function (a,b){
                    if (a.title > b.title) {
                        return -1
                    }
                    if (b.title > a.title) {
                        return 1
                    }
                    return 0
                })
                console.log(aux)
            return {
                ...state,
                recipes: aux,
                recipesFilter: aux2
            }
        default: return { ...state }
    }
}
