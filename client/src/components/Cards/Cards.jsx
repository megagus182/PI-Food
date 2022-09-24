import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Cards.css"


export default function Cards({ recipes }) {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage =()=>{
  setCurrentPage(currentPage + 9)    
  }
  const prevPage =()=>{
    if(currentPage>0)
    setCurrentPage(currentPage - 9)    
    }

  const filterRecipe = ()=>{
  return recipes.slice(currentPage, currentPage + 9);
  }
  return (
    <div className="co">
      <div className="botones">
        <button onClick={prevPage}>Previous</button>
     &nbsp;
     <button onClick={nextPage}>Next</button>
     </div>
     
    <section className="layout">
      {filterRecipe()?.map((element) => (
        <div key={element.id} className="cont">
          <Link to={`/detail/${element.id}`}>
            <Card
              title={element.title}
              diets={element.diets}
              image={element.image}
            />
          </Link>
        </div>
      ))}
    </section>
    </div>
  );
}
