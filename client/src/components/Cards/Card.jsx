import React from "react";
import recipeDefault from "../../img/recipeDefault.png";

export default function Card({ title, diets, image }) {
  const dietList = diets?.length ? (
    <ul className="flex flex-wrap gap-1 mt-2">
      {diets.map((d, idx) => (
        <li
          key={idx}
          className="bg-green-100 text-green-800 text-xs font-medium rounded-full px-2 py-0.5"
        >
          {d.name.toUpperCase()}
        </li>
      ))}
    </ul>
  ) : (
    <h6 className="text-gray-700 text-sm">WITHOUT DIET</h6>
  );

  const imageToUse = image || recipeDefault;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between border border-gray-200">
      <img
        src={imageToUse}
        alt="recipe"
        className="w-full h-36 object-cover rounded-md mb-2"
      />
      <h5 className="text-gray-900 text-lg font-semibold mb-1 line-clamp-1">{title}</h5>
      {dietList}
    </div>
  );
}
