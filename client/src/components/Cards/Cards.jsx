import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Cards.css";

export default function Cards({ recipes }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0)
  }, [recipes]);

  const nextPage = () => {
    if (currentPage + 9 < recipes.length) {
      setCurrentPage(currentPage + 9);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 9);
  };

  const page = (e) => {
    switch (e.target.name) {
      case "1":
        setCurrentPage(0);
        break;
      case "2":
        setCurrentPage(9);
        break;
      case "3":
        setCurrentPage(18);
        break;
      case "4":
        setCurrentPage(27);
        break;
      case "5":
        setCurrentPage(36);
        break;
      case "6":
        setCurrentPage(45);
        break;
      case "7":
        setCurrentPage(54);
        break;
      case "8":
        setCurrentPage(63);
        break;
      case "9":
        setCurrentPage(72);
        break;
      case "10":
        setCurrentPage(81);
        break;
      case "11":
        setCurrentPage(90);
        break;
      case "12":
        setCurrentPage(99);
        break;
      default:
        return null;
    }
  };
  
  const filterRecipe = () => {
    return recipes.slice(currentPage, currentPage + 9);
  };


  return (
    <div className="co">
      <div className="botones">
        <button onClick={prevPage}> « </button>
        &nbsp;
        <button name="1" onClick={page}>
          1
        </button>
        &nbsp;
        <button name="2" onClick={page}>
          2
        </button>
        &nbsp;
        <button name="3" onClick={page}>
          3
        </button>
        &nbsp;
        <button name="4" onClick={page}>
          4
        </button>
        &nbsp;
        <button name="5" onClick={page}>
          5
        </button>
        &nbsp;
        <button name="6" onClick={page}>
          6
        </button>
        &nbsp;
        <button name="7" onClick={page}>
          7
        </button>
        &nbsp;
        <button name="8" onClick={page}>
          8
        </button>
        &nbsp;
        <button name="9" onClick={page}>
          9
        </button>
        &nbsp;
        <button name="10" onClick={page}>
          10
        </button>
        &nbsp;
        <button name="11" onClick={page}>
          11
        </button>
        &nbsp;
        <button name="12" onClick={page}>
          12
        </button>
        &nbsp;
        <button onClick={nextPage}>»</button>
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
