import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { getRecipe, getByDiet, sortRecipe, cleanFilter } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const recipesFilter = useSelector((state) => state.recipesFilter);

  const [recipe, setRecipe] = useState({ diets: "" });

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getByDiet(recipe.diets));
  }, [recipe, dispatch]);

  useEffect(() => {
    dispatch(getRecipe()).then(() => setLoading(false));
  }, [dispatch]);

  function sortRecipes(e) {
    dispatch(sortRecipe(e.target.value));
  }

  function traerRecetas() {
    dispatch(cleanFilter());
    dispatch(getRecipe());
  }

  const aux = recipesFilter.length ? recipesFilter : recipes;
  const error = useSelector(state => state.error);

  return (
    <div
      className="w-full mb-10 min-h-screen flex flex-col items-center justify-start bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/home.jpg')" }}
    >
      <div className="pt-20 m-5 w-full flex flex-col items-center gap-6">
        {/* SearchBar */}
        <SearchBar onSearchActive={setIsSearching} />

        {/* Mostrar botón solo si hubo búsqueda */}
        {isSearching && (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-1 rounded shadow cursor-pointer"
            onClick={() => {
              setIsSearching(false);
              traerRecetas();
            }}
          >
            🔄 Show All Recipes
          </button>
        )}

        {/* Filtros y orden */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          {/* Filtro Dietas */}
          <div className="flex items-center gap-3 z-20 bg-white bg-opacity-80 rounded-md px-4 py-2 shadow-md">
            <select
              name="diets"
              aria-label="Filter by diet"
              className="appearance-none rounded-full border border-black bg-white bg-opacity-90 px-3 py-1 cursor-pointer"
              value={recipe.diets}
              onChange={handleChange}
            >
              <option value="">Select Diet</option>
              <option value="gluten free">Gluten Free</option>
              <option value="dairy free">Dairy Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="lacto-vegetarian">Lacto-Vegetarian</option>
              <option value="low fodmap">Low FODMAP</option>
              <option value="paleo">Paleo</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="primal">Primal</option>
              <option value="vegan">Vegan</option>
              <option value="whole30">Whole30</option>
            </select>
            <button
              name="diets"
              className="text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 px-3 py-1 rounded shadow cursor-pointer"
              value=""
              onClick={handleChange}
            >
              Reset View
            </button>
          </div>

          {/* Orden */}
          <div className="flex items-center gap-4 z-20 bg-white bg-opacity-80 rounded-md px-4 py-2 shadow-md min-w-[240px]">
            <span className="!text-yellow-800 font-semibold select-none whitespace-nowrap">
              ORDER BY:
            </span>
            <button
              name="diets"
              className="text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 px-4 py-1 rounded shadow cursor-pointer"
              value="asc"
              onClick={sortRecipes}
            >
              A-Z
            </button>
            <button
              name="diets"
              className="text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 px-4 py-1 rounded shadow cursor-pointer"
              value="dsc"
              onClick={sortRecipes}
            >
              Z-A
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 w-full max-w-6xl px-4">
{error && (
      <div className="text-center text-red-600 font-bold my-4">
        ⚠️ {error}
      </div>
    )}

    {!error && recipes.length > 0 && (
      <Cards recipes={aux} />
    )}

    {!error && recipes.length === 0 && (
      <div className="text-center text-gray-500 my-4">No hay recetas para mostrar.</div>
    )}      </div>

      {loading && <Loading />}
    </div>
  );
}
