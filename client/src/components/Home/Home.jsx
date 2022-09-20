import React from "react";
import Cards from "../Cards/Cards";
import { getRecipe } from "../../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);

  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getRecipe());
  }, []);

  useEffect(() => {}, [recipes]);

  return (
    <div className="container">
      <Cards recipes={recipes} />
    </div>
  );
}

// [ ] Input de búsqueda para encontrar recetas por nombre
// [x] Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// [ ] Botones/Opciones para filtrar por por tipo de dieta
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente
// las recetas por orden alfabético y por health score (nivel de comida saludable).
// [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, 
// mostrando las primeros 9 en la primer pagina.