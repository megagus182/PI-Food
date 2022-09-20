import React from "react";
import { useState } from "react";
import "./CreateRecipe.css";

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    diets: [],
  });

  const [errorButton, setErrorButton] = useState(true);

  function handleDiets(e) {
setRecipe({
    ...recipe,
diets: [...new Set([...recipe.diets, e.target.value])]
})
  }

  function handleChange(e) {
    setRecipe ({
        ...recipe,
        [e.target.name]: e.target.value
    })
    console.log(recipe)
  }
  function handleSubmit(e) {
    e.preventDefault()
  }

  function validate(){
    let error = {recipe.title} //<---
  }

  return (
    <div className="create">
      <div>
        <form onSubmit={handleSubmit()}>
          <div>
            {/* TITLE */}
            <label>TITLE</label>
            <input
              name="title"
              value={recipe.title}
              onChange={handleChange}
            ></input>
            {/* SUMMARY */}
            <label>SUMMARY</label>
            <input
              name="summary"
              value={recipe.summary}
              onChange={handleChange}
            ></input>
            {/* HEALTSCORE */}
            <label>HEALTSCORE</label>
            <input
              name="healthScore"
              value={recipe.healthScore}
              onChange={handleChange}
            ></input>
            {/* INSTRUCCIONS */}
            <label>INSTRUCCIONS</label>
            <input
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            ></input>
            {/* DIETS */}
            <label>DIETS</label>
            <select name="diets" value={recipe.diets} onChange={handleDiets}>
              <option value={1}>Gluten Free</option>
              <option value={2}>Low FODMAP</option>
              <option value={3}>Ketogenic</option>
              <option value={4}>Vegetarian</option>
              <option value={5}>Lacto-Vegetarian</option>
              <option value={6}>Ovo-Vegetarian</option>
              <option value={7}>Vegan</option>
              <option value={8}>Pescetarian</option>
              <option value={9}>Paleo</option>
              <option value={10}>Primal</option>
              <option value={11}>Whole30</option>
            </select>
            <button type="submit" disabled={errorButton? true:false}>Create Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso
// [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// [ ] Botón/Opción para crear una nueva receta
