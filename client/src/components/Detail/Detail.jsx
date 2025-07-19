import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesDetail, cleanDetail } from "../../actions";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../Loading";
import icon from "../../img/icon.png";
import recipeDefault from "../../img/recipeDefault.png";

export default function Detail() {
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesDetail(id)).then(() => setLoading(false));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);

  const image = recipeDetail.image || recipeDefault;
  const dishTypes = recipeDetail.dishTypes || [];

  return (
    <div  className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-6" style={{ backgroundImage: `url('/back1.png)`}}>
      <div className="max-w-5xl mx-auto">
        {/* Botón de regreso */}
        <div className="mb-6">
          <NavLink
            to="/home"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            <img src={icon} alt="icon" className="w-6 h-6 mr-2" />
            Home
          </NavLink>
        </div>

        {/* Tarjeta de detalle */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {recipeDetail.title}
          </h1>

          {/* Imagen */}
          <div className="flex justify-center mb-6">
            <img
              src={image}
              alt={recipeDetail.title}
              className="rounded-xl max-w-sm w-full object-cover"
            />
          </div>

          {/* Info: healthScore y dishTypes */}
          <div className="flex flex-col sm:flex-row justify-around text-center gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-1">Health Score</h3>
              <p className="text-lg text-gray-800">{recipeDetail.healthScore}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-1">Dish Types</h3>
              <ul className="text-gray-800 text-sm space-y-1">
                {dishTypes.map((d, i) => (
                  <li key={i}>{d.toUpperCase()}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Summary</h3>
            <p
              className="text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
            />
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Instructions</h3>
            <p
              className="text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: recipeDetail.instructions }}
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && <Loading />}
    </div>
  );
}
