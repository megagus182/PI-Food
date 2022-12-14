import React, { useState } from "react";
import Cards from "../Cards/Cards";
import { getRecipe, getByDiet, sortRecipe, cleanFilter } from "../../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import Loading from "../Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const recipes = useSelector((state) => state.recipes);
  //////FILTRO ///
  const recipesFilter = useSelector((state) => state.recipesFilter);
  const [recipe, setRecipe] = useState({
    diets: "",
  });
  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getByDiet(recipe.diets));
  }, [recipe]);
  ///////TERMINA FILTRO////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipe()).then((recipes) => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  let aux = "";
  if (recipesFilter.length) {
    aux = recipesFilter;
  } else {
    aux = recipes;
  }

  function sortRecipes(e){
    dispatch(sortRecipe(e.target.value))
  }

  function traerRecetas(){
    dispatch(cleanFilter())
    dispatch(getRecipe())
  }


  return (
    <div className="container">
      <button className="traer" onClick={traerRecetas}>ALL RECIPES</button>
      <div className="filtro"> 
      <select name="diets" className="filter" value={recipe.diets} onChange={handleChange}>
      <option value={0}></option>
        <option value={"gluten free"}>Gluten Free</option>
        <option value={"dairy free"}>Dairy Free</option>
        <option value={"ketogenic"}>Ketogenic</option>
        <option value={"lacto ovo vegetarian"}>Lacto-Vegetarian</option>
        <option value={"fodmap friendly"}>Low FODMAP</option>
        <option value={"paleolithic"}>Paleo</option>
        <option value={"pescatarian"}>Pescetarian</option>
        <option value={"primal"}>Primal</option>
        <option value={"vegan"}>Vegan</option>
        <option value={"whole 30"}>Whole30</option>
      </select>
      <button name="diets" className="remove" value={""} onClick={handleChange}>Remove Filter</button>
      </div>
      <div className="aZ">
        <span>ORDER BY:</span>
      <button name="diets" className="remove" value={"asc"} onClick={sortRecipes}>A-Z</button>
      <button name="diets" className="remove" value={"dsc"} onClick={sortRecipes}>Z-A</button>
      </div>
      <Cards recipes={aux} />
      {loading && <Loading />}
    </div>
  );
}
// [] TESTING
// [x] Input de b??squeda para encontrar recetas por nombre
// [x] ??rea donde se ver?? el listado de recetas. Deber?? mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto cel??aco, etc)
// [x] Botones/Opciones para filtrar por por tipo de dieta
// [x] Botones/Opciones para ordenar tanto ascendentemente como descendentemente
// las recetas por orden alfab??tico y por health score (nivel de comida saludable).
// [x] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina,
// mostrando las primeros 9 en la primer pagina.
