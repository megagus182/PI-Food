import React from "react";
import { getRecipesDetail, cleanDetail } from "../../actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import recipeDefault from "../../img/recipeDefault.png";
import "./Detail.css";
import { NavLink } from "react-router-dom";
import icon from "../../img/icon.png";
import Loading from "../Loading";

export default function Detail() {
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesDetail(id)).then(recipeDetail =>{
      setLoading(false)
    })
  }, []);

useEffect(()=>{
  return ()=>{
    dispatch(cleanDetail())
  }
},[])

  if (!recipeDetail.image) {
    recipeDetail.image = recipeDefault;
  }

  const dish = recipeDetail.dishTypes

  if(recipeDetail.dishTypes){
    var dishmap = dish.map(d => <li className="list" key={id}>{d.toUpperCase()}</li>)
  }

  return (
    <div className="detail">
      <div className="data">
        <div className="nav">
          <NavLink to={"/home"} className="navhome">
            <img src={icon} className="icon" alt="dfg" />
            <span className="span">Home</span>
          </NavLink>
        </div>
        <h3>DETAIL RECIPE</h3>
        <h4>{recipeDetail.title}</h4>
        <div className="imgDetail">
          <img
          className="i"
            src={recipeDetail.image}
            width="300"
            height="230"
            alt="not found"
          />
          <div className="health">
            <span>HEALTHSCORE: </span><br></br>
            <span>{recipeDetail.healthScore}</span>
            <br></br>
            <br></br>
            <span>DISHTYPES: </span><br></br>
            <span>{dishmap}</span>
          </div>
        </div>
        <span>SUMMARY:</span>
        <span>{recipeDetail.summary}</span>
        <span>INSTRUCTIONS: </span>
        <span> {recipeDetail.instructions}</span>
      </div>
      {loading && <Loading />}
    </div>
  );
}
