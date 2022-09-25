import React from "react";
import recipeDefault from "../../img/recipeDefault.png"
import "./Card.css"

export default function Card({title, diets, image}) {
if(diets && diets.length){
  // var filtro= <h6>{diets[0].name.toUpperCase()}</h6>
  var filtro= diets.map(d => <li>{d.name.toUpperCase()}</li>)
}
else{
  filtro = <h6>WITHOUT DIET</h6>
}

if(!image){
  image=recipeDefault
}
  return (
    <div className="contenedor">
      <div>
        <img src={image} width="150" height="100" alt="recipe" />
      </div>
      <div>
        <h5>{title}</h5>
        {filtro}
      </div>
      <div>
      </div>
    </div>
  );
}
