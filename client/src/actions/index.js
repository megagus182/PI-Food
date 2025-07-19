export const GET_RECIPES = "Traer las recetas de la API del backend"
export const GET_RECIPES_DETAIL = "Traer el detalle de una receta de la API del backend"
export const GET_BY_DIET = "Traer recetas por tipo de dieta"
export const SORT_RECIPE = "Acomodar de la A a la Z"
export const CLEAN_DETAIL = "limpiar detalle"
export const CLEAN_FILTER = "limpiar filtros"
export const SET_ERROR = "SET_ERROR"; 
/////////////
const URL_GET_RECIPES = "https://pi-food-j5lj.onrender.com/recipes"           //Url al backedn para traer todas las recetas
const URL_GET_DETAILS = "https://pi-food-j5lj.onrender.com/recipes/" //Url al back para traer el detalle de una receta por id
const URL_GET_SEARCH = "https://pi-food-j5lj.onrender.com/recipes?name=" //Url para buscar en el searchbar

//const URL_GET_RECIPES = "http://localhost:3001/recipes"           //Url al backedn para traer todas las recetas
//const URL_GET_DETAILS = "http://localhost:3001/recipes/" //Url al back para traer el detalle de una receta por id
//const URL_GET_SEARCH = "http://localhost:3001/recipes?name=" 
export function getRecipe() {
    return function (dispatch) {
        return fetch(URL_GET_RECIPES)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Se agotaron los créditos de la API o el servidor no responde.");
                }
                return res.json();
            })
            .then(respuestaJson => dispatch({
                type: GET_RECIPES,
                payload: respuestaJson,
            }))
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.message,
                });
            });
    };
}

export function getRecipeSearch(name) {
    return function (dispatch) {
        return fetch(URL_GET_SEARCH + name)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al buscar. La API puede estar sin créditos o caída.");
                }
                return res.json();
            })
            .then(respuestaJson => dispatch({
                type: GET_RECIPES,
                payload: respuestaJson
            }))
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.message,
                });
            });
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