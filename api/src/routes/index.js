const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const { Op } = require("sequelize");
const { Diet, Recipe } = require('../db.js');
const router = express();
const { SPOONACULAR_API_KEY } = process.env;

router.use(express.json());
router.use(morgan("dev"));

// ---------------- FUNCIONES API ----------------

const getApiRecipesAll = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeInformation: true,
        number: 100,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error en getApiRecipesAll:", error.message);
    return []; // Devuelve un array vacío si falla
  }
};

const getApiRecipes = async (name) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: name,
        addRecipeInformation: true,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error en getApiRecipes:", error.message);
    return []; // Devuelve un array vacío si falla
  }
};

const getApiRecipesDetail = async (id) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getApiRecipesDetail:", error.message);
    throw error;
  }
};

// ---------------- RUTAS ----------------

// GET /recipes
router.get("/recipes", async (req, res) => {
  const { name } = req.query;

  try {
    let response = [];
    if (name) {
      response = await getApiRecipes(name);
    }

    const allRecipesApi = await getApiRecipesAll();
    const objBd = await Recipe.findAll({ include: [{ model: Diet }] });

    const allRecipesFormat = allRecipesApi.map((receta) => ({
      id: receta.id,
      title: receta.title,
      image: receta.image,
      healthScore: receta.healthScore,
      diets: receta.diets.map((d) => ({ name: d })),
    }));

    const responseFormat = response.map((receta) => ({
      id: receta.id,
      title: receta.title,
      image: receta.image,
      healthScore: receta.healthScore,
      diets: receta.diets.map((d) => ({ name: d })),
    }));

    const dbRecipe = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [{ model: Diet }],
    });

    const total = responseFormat.concat(dbRecipe);

    if (!name) {
      res.status(200).json(allRecipesFormat.concat(objBd));
    } else if (response.length === 0 && dbRecipe.length === 0) {
      res.status(404).json({ msg: "No se encontraron recetas con ese nombre." });
    } else {
      res.status(200).json(total);
    }
  } catch (error) {
    console.error("Error en /recipes:", error.message);
    res.status(500).json({ msg: "Ocurrió un error al obtener las recetas." });
  }
});

// GET /recipes/:idRecipe
router.get("/recipes/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;

  try {
    if (idRecipe.length > 9) {
      const objDb = await Recipe.findByPk(idRecipe, {
        include: [{ model: Diet }],
      });
      if (!objDb) return res.status(404).json({ msg: "Receta no encontrada en la BD." });
      return res.status(200).json(objDb);
    } else {
      const response = await getApiRecipesDetail(idRecipe);
      const obj = {
        id: response.id,
        title: response.title,
        summary: response.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        healthScore: response.healthScore,
        image: response.image,
        dishTypes: response.dishTypes,
        diets: response.diets.map((d) => ({ name: d })),
        instructions: response.instructions?.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, "") || "No instructions provided.",
      };
      return res.status(200).json(obj);
    }
  } catch (error) {
    console.error("Error en /recipes/:idRecipe:", error.message);
    res.status(500).json({ msg: "Error al obtener el detalle de la receta." });
  }
});

// POST /recipes
router.post("/recipes", async (req, res) => {
  const { title, summary, healthScore, instructions, diets } = req.body;

  if (!title || !summary) return res.status(400).json({ msg: "Faltan datos obligatorios." });

  try {
    const nuevaReceta = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
    });

    if (diets && diets.length > 0) {
      await nuevaReceta.setDiets(diets);
    }

    res.status(201).json(nuevaReceta);
  } catch (error) {
    console.error("Error en POST /recipes:", error.message);
    res.status(500).json({ msg: "Error al crear la receta." });
  }
});

// GET /diets
router.get("/diets", async (req, res) => {
  try {
    const response = await getApiRecipesAll();
    const uniqueDiets = new Set();

    response.forEach((recipe) => {
      recipe.diets?.forEach((diet) => uniqueDiets.add(diet));
    });

    const dbPrecharge = Array.from(uniqueDiets).map((name, i) => ({
      id: i + 1,
      name,
    }));

    await Diet.bulkCreate(dbPrecharge, { ignoreDuplicates: true });
    res.status(200).json({ msg: "Dietas cargadas correctamente." });
  } catch (error) {
    console.error("Error en /diets:", error.message);
    res.status(500).json({ msg: "Error al cargar las dietas." });
  }
});

module.exports = router;
