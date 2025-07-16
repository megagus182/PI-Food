export const GET_RECIPES = "Traer las recetas de la API del backend"
export const GET_RECIPES_DETAIL = "Traer el detalle de una receta de la API del backend"
export const GET_BY_DIET = "Traer recetas por tipo de dieta"
export const SORT_RECIPE = "Acomodar de la A a la Z"
export const CLEAN_DETAIL = "limpiar detalle"
export const CLEAN_FILTER = "limpiar filtros"
/////////////
const URL_GET_RECIPES = "https://pi-food-j5lj.onrender.com/recipes"           //Url al backedn para traer todas las recetas
const URL_GET_DETAILS = "https://pi-food-j5lj.onrender.com/recipes/" //Url al back para traer el detalle de una receta por id
const URL_GET_SEARCH = "https://pi-food-j5lj.onrender.com/recipes?name=" //Url para buscar en el searchbar

export function getRecipe() { //HOME
    return function (dispatch) {        //uso la funcion dispatch
        return fetch(URL_GET_RECIPES)   //hago fetch a la url
            .then(res => res.json())    //la respuesta la convierto en json
            .then(respuestaJson => dispatch({  //uso la respuesta y la dispacho al reducer
                type: GET_RECIPES,
                payload: respuestaJson,
            }))
    };
}

export function getRecipeSearch(name) { //SEARCHBAR
    return function async(dispatch) {
        return fetch(URL_GET_SEARCH + name)   //hago fetch a la url
            .then(res => res.json())    //la respuesta la convierto en json
            .then(respuestaJson => dispatch({  //uso la respuesta y la dispacho al reducer
                type: GET_RECIPES,
                payload: respuestaJson
            }))
        //uso la funcion dispatch
    };
}

export function getRecipesDetail(id) { //DETALLE DE RECETA
    return function (dispatch) {
        return fetch(URL_GET_DETAILS + id)
            .then(res => res.json())
            .then(respuestaJson => dispatch({
                type: GET_RECIPES_DETAIL,
                payload: respuestaJson
            }))
    }
}

export function getByDiet(diet) { //FILTRO POR DIETA
    return {
        type: GET_BY_DIET,
        payload: diet,
    }
}

export function sortRecipe(value) { //ORDENAMIENTO A-Z
    return {
        type: SORT_RECIPE,
        payload: value
    }
}

export function cleanDetail() {
    return {
        type: CLEAN_DETAIL
    }
}

export function cleanFilter() {
    return {
        type: CLEAN_FILTER
    }
}