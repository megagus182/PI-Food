import React from "react";
import { useState } from "react";
import "./CreateRecipe.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import icon from "../../img/icon.png";
import { useHistory } from "react-router-dom";

export default function CreateRecipe() {
  const history = useHistory();
  //Estado local de receta
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    diets: [],
  });
  //Estado local de error de formulario
  const [errorForm, setErrorForm] = useState({});
  //Estado local para el disable del botón
  const [errorButton, setErrorButton] = useState(
    Object.keys(errorForm).length === 0 ? false : true
  );
  //Handle para cada cambio del formulario
  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
    setErrorForm(validate(recipe));
    console.log(recipe);
  }
  //Hanlde para agregar dietas sin que se repitan
  function handleDiets(e) {
    setRecipe({
      ...recipe,
      diets: [...new Set([...recipe.diets, e.target.value])],
    });
  }
  //Hanlde para submitear
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorForm(validate(recipe));
    await axios.post("http://localhost:3001/recipes", recipe);
    setRecipe({
      title: "",
      summary: "",
      healthScore: 0,
      instructions: "",
      diets: [],
    });
    alert("Recipe create succesfully");
    history.push("/Home");
  }

  function validate(info) {
    let error = {};
    if (!info.title || info.title === "") error.title = "Title is required";
    if (typeof info.title !== "string")
      error.title = "The type of data need to be string";
    if (!info.summary) error.summary = "Summary is required";
    if (typeof info.summary !== "string")
      error.name = "The type of data need to be string";
    if (!info.healthScore) error.healthScore = "Put a HealthScore: 1 - 100";
    if (typeof info.healthScore !== "number")
      error.name = "The type of data need to be a number: 1-100";
    if (!info.instructions) error.instructions = "Instructions are required";
    return error;
  }

  let aux = [];
  for (let i = 0; i < recipe.diets.length; i++) {
    if (recipe.diets[i] === "1") aux.push("Gluten Free /");
    if (recipe.diets[i] === "2") aux.push("Low FODMAP /");
    if (recipe.diets[i] === "3") aux.push("Ketogenic /");
    if (recipe.diets[i] === "4") aux.push("Dairy free /");
    if (recipe.diets[i] === "5") aux.push("Lacto-Vegetarian /");
    if (recipe.diets[i] === "6") aux.push("Vegan /");
    if (recipe.diets[i] === "7") aux.push("Pescetarian /");
    if (recipe.diets[i] === "8") aux.push("Paleo /");
    if (recipe.diets[i] === "9") aux.push("Primal /");
    if (recipe.diets[i] === "10") aux.push("Whole30 /");
  }
  return (
    <div className="create">
      <NavLink to={"/home"} className="navhome">
        <img src={icon} className="icon" alt="dfg" />
        <span className="span">Home</span>
      </NavLink>
      <div className="contain">
        <form onSubmit={handleSubmit}>
          <div className="cuadro">
            <div className="sombra">
              <h1>CREATE A RECIPE</h1>
              {/* TITLE */}
              <div className="justificado">
                <label>TITLE </label>
                <input
                  className="titleInp"
                  name="title"
                  placeholder="e.g: Salsa de chiles habaneros"
                  value={recipe.title}
                  onChange={handleChange}
                ></input>
                <h4>
                  {errorForm.title ? (
                    <small className="red">{errorForm.title}</small>
                  ) : (
                    false
                  )}
                </h4>
                {/* SUMMARY */}
                <label>SUMMARY </label>
                <input
                  name="summary"
                  className="inpSum"
                  placeholder="Summary of your recipe"
                  value={recipe.summary.replace(/<[^>]*>?/g, "")}
                  onChange={handleChange}
                ></input>
                <h4>
                  {errorForm.summary ? (
                    <small className="red">{errorForm.summary}</small>
                  ) : (
                    false
                  )}
                </h4>
                {/* INSTRUCCIONS */}
                <label>INSTRUCCIONS </label>
                <textarea
                  type={"text"}
                  className="inpIns"
                  name="instructions"
                  placeholder="1.-&#10;2.-&#10;3.-"
                  value={recipe.instructions.replace(/<[^>]*>?/g, "")}
                  onChange={handleChange}
                ></textarea>
                <h4>
                  {errorForm.instructions ? (
                    <small className="red">{errorForm.instructions}</small>
                  ) : (
                    false
                  )}
                </h4>
                {/* HEALTSCORE */}
                <div> 
                <label>HEALTSCORE </label>
                <input
                  type="range"
                  className="range"
                  name="healthScore"
                  min="0"
                  max="100"
                  step="5"
                  value={recipe.healthScore}
                  onChange={handleChange}
                  ></input><span>{recipe.healthScore}</span>
                  </div>
                <h4>
                  {errorForm.healthScore ? (
                    <small className="red">{errorForm.healthScore}</small>
                  ) : (
                    false
                  )}
                </h4>
                {/* DIETS */}
                <label>DIETS </label>
                <select
                  name="diets"
                  className="filter"
                  value={recipe.diets}
                  onChange={handleDiets}
                >
                  <option value={1}>1.-Gluten Free</option>
                  <option value={2}>2.-Low FODMAP</option>
                  <option value={3}>3.-Ketogenic</option>
                  <option value={4}>4.-Dairy free</option>
                  <option value={5}>5.-Lacto-Vegetarian</option>
                  <option value={6}>6.-Vegan</option>
                  <option value={7}>7.-Pescetarian</option>
                  <option value={8}>8.-Paleo</option>
                  <option value={9}>9.-Primal</option>
                  <option value={10}>10.-Whole30</option>
                </select>
              </div>
              <div>
                <span>{aux}</span>
                <h5> </h5>
                <button
                  className="createBut"
                  type="submit"
                  disabled={errorButton}
                >
                  Create Recipe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// [x] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso
// [x] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// [x] Botón/Opción para crear una nueva receta
