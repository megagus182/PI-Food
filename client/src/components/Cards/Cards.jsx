import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Cards.css"

export default function Cards({ recipes }) {
  return (
    <div className="container">
      {recipes?.map((element) => (
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
    </div>
  );
}
