import React from "react";
import { getRecipesDetail } from "../../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import recipeDefault from "../../img/recipeDefault.png"


export default function Detail() {
    const recipeDetail = useSelector((state) => state.recipeDetail);
    const dispacth = useDispatch();
    let { id } = useParams();

  useEffect(() => {
    console.log(id)
    dispacth(getRecipesDetail(id));
  }, []);

  if(!recipeDetail.image){
    recipeDetail.image=recipeDefault
  }

  return (
    <div>
      <h3>Detail Recipe id: {recipeDetail.id}</h3>
      <h3>{recipeDetail.title}</h3>
      <img src={recipeDetail.image} width="500" height="370" alt="not found"/>
      <h5>HealthScore: {recipeDetail.healthScore}</h5>
      <h5>DishTypes: {recipeDetail.dishTypes} </h5>
      <h5>Summary: {recipeDetail.summary}</h5>
      <h5>Instructions: {recipeDetail.instructions}</h5>
    </div>
  );
}
