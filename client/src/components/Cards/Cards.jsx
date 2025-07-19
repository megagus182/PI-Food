import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Cards({ recipes }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
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
    const number = parseInt(e.target.name);
    setCurrentPage((number - 1) * 9);
  };

  const filterRecipe = () => recipes.slice(currentPage, currentPage + 9);

  const botonado = () => {
    const totalPages = Math.ceil(recipes.length / 9);
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        name={i + 1}
        onClick={page}
        className={`$ {
          (i + 1) === currentPage / 9 + 1
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800"
        } px-3 py-1 mx-1 rounded hover:bg-green-400 transition-all duration-200`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#fffaf5] px-4">
      <div className="flex flex-wrap justify-center items-center gap-2 my-4">
        <button
          onClick={prevPage}
          className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-green-400 transition-all duration-200"
        >
          «
        </button>
        {botonado()}
        <button
          onClick={nextPage}
          className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-green-400 transition-all duration-200"
        >
          »
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {filterRecipe()?.map((element) => (
          <Link
            to={`/detail/${element.id}`}
            key={element.id}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Card
              title={element.title}
              diets={element.diets}
              image={element.image}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}