import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import icon from "../../img/icon.png";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    diets: [],
  });

  const [errorForm, setErrorForm] = useState({ title: "" });
  const [errorButton, setErrorButton] = useState(true);

  useEffect(() => {
    setErrorButton(Object.keys(errorForm).length > 0);
  }, [errorForm]);

  function handleChange(e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
    setErrorForm(validate({ ...recipe, [e.target.name]: e.target.value }));
  }

  function handleDiets(e) {
    if (e.target.value === "0") return;
    setRecipe({
      ...recipe,
      diets: [...new Set([...recipe.diets, e.target.value])],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorForm(validate(recipe));
    await axios.post("https://pi-food-j5lj.onrender.com/recipes", recipe);
    alert("Recipe created successfully");
    navigate("/home");
  }

  function validate(info) {
    const error = {};
    if (!info.title) error.title = "Title is required";
    if (!info.summary) error.summary = "Summary is required";
    if (!info.healthScore || info.healthScore < 1)
      error.healthScore = "Put a HealthScore between 1 and 100";
    if (!info.instructions) error.instructions = "Instructions are required";
    return error;
  }

  function deleteDiet(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      diets: recipe.diets.filter((d) => d !== e.target.name),
    });
  }

  const dietsList = [
    { id: "1", name: "Gluten Free" },
    { id: "2", name: "Low FODMAP" },
    { id: "3", name: "Ketogenic" },
    { id: "4", name: "Dairy Free" },
    { id: "5", name: "Lacto-Vegetarian" },
    { id: "6", name: "Vegan" },
    { id: "7", name: "Pescetarian" },
    { id: "8", name: "Paleo" },
    { id: "9", name: "Primal" },
    { id: "10", name: "Whole30" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        {/* NAV */}
        <NavLink to="/home" className="inline-flex items-center mb-6 text-green-600 hover:text-green-800">
          <img src={icon} className="w-6 h-6 mr-2" alt="icon" />
          <span className="text-lg font-medium">Home</span>
        </NavLink>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create a Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g: Salsa de chiles habaneros"
              value={recipe.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errorForm.title && <p className="text-red-500 text-sm mt-1">{errorForm.title}</p>}
          </div>

          {/* SUMMARY */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Summary</label>
            <input
              type="text"
              name="summary"
              placeholder="Summary of your recipe"
              value={recipe.summary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errorForm.summary && <p className="text-red-500 text-sm mt-1">{errorForm.summary}</p>}
          </div>

          {/* INSTRUCTIONS */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Instructions</label>
            <textarea
              name="instructions"
              placeholder="1.- ...&#10;2.- ..."
              rows="4"
              value={recipe.instructions}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errorForm.instructions && <p className="text-red-500 text-sm mt-1">{errorForm.instructions}</p>}
          </div>

          {/* HEALTHSCORE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Health Score</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="healthScore"
                min="0"
                max="100"
                step="5"
                value={recipe.healthScore}
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-gray-800 font-bold">{recipe.healthScore}</span>
            </div>
            {errorForm.healthScore && <p className="text-red-500 text-sm mt-1">{errorForm.healthScore}</p>}
          </div>

          {/* DIETS */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Diets</label>
            <select
              name="diets"
              onChange={handleDiets}
              className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              <option value="0">-- Select a diet --</option>
              {dietsList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Tags de dietas seleccionadas */}
            <div className="flex flex-wrap gap-2 mt-2">
              {recipe.diets.map((id) => {
                const name = dietsList.find((d) => d.id === id)?.name || id;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-lime-100 text-lime-800 rounded-full px-3 py-1 text-sm"
                  >
                    {name}
                    <button
                      name={id}
                      onClick={deleteDiet}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={errorButton}
            className={`w-full py-3 text-white rounded-lg font-semibold transition-colors duration-300 ${
              errorButton
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-600 cursor-pointer"
            }`}
          >
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
