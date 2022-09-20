import React from "react";
import recipeDefault from "../../img/recipeDefault.png"

export default function Card({title, diets, image}) {

if(diets.length){
  var filtro= <h5>Diet: {diets[0].name}</h5>
}
else{
  filtro = <h5>Without Diet</h5>
}

if(!image){
  image=recipeDefault
}
  return (
    <div className="contenedor">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        {filtro}
      </div>
      <div>
        <img src={image} width="312" height="231" alt="recipe" />
      </div>
    </div>
  );
}
