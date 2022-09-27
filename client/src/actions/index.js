export const GET_RECIPES = "Traer las recetas de la API del backend";
export const GET_RECIPES_DETAIL = "Traer el detalle de una receta de la API del backend"
export const GET_BY_DIET = "Traer recetas por tipo de dieta"
/////////////
export const SORT_RECIPE = "Acomodar de la A a la Z"
export const REMOVE_FAVORITE = "Borrar una receta de favoritos"

const URL_GET_RECIPES = "http://localhost:3001/recipes"           //Url al backedn para traer todas las recetas
const URL_GET_DETAILS = "http://localhost:3001/recipes/" //Url al back para traer el detalle de una receta por id
const URL_GET_SEARCH = "http://localhost:3001/recipes?name=" //Url para buscar en el searchbar

export function getRecipe() {
    return function (dispatch) {        //uso la funcion dispatch
        return fetch(URL_GET_RECIPES)   //hago fetch a la url
            .then(res => res.json())    //la respuesta la convierto en json
            .then(respuestaJson => dispatch({  //uso la respuesta y la dispacho al reducer
                type: GET_RECIPES,
                payload: respuestaJson,
            }))
    };
}

export function getRecipeSearch(name) {
    return function (dispatch) {        //uso la funcion dispatch
        return fetch(URL_GET_SEARCH + name)   //hago fetch a la url
            .then(res => res.json())    //la respuesta la convierto en json
            .then(respuestaJson => dispatch({  //uso la respuesta y la dispacho al reducer
                type: GET_RECIPES,
                payload: respuestaJson,
            }))
    };
}

export function getRecipesDetail(id) {
    return function (dispatch) {
        return fetch(URL_GET_DETAILS + id)
            .then(res => res.json())
            .then(respuestaJson => dispatch({
                type: GET_RECIPES_DETAIL,
                payload: respuestaJson
            }))
    }
}

export function getByDiet(diet) {
    return {
        type: GET_BY_DIET,
        payload: diet,
    }
}

export function sortRecipe(value) {
    return {
        type: SORT_RECIPE,
        payload: value
    }
}