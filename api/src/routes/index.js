const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Diet, Recipe } = require('../db.js');
const router = express();
const { API_KEY } = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use(morgan("dev"));

// IMPORTANTE: No está permitido utilizar los filtrados, ordenamientos y paginados brindados
// por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

//https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}
//https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&addRecipeInformation=true
//https://api.spoonacular.com/recipes/{id}/information?apiKey={API_KEY}

//FUNCIONES PARA TRAER DATOS DE LA API
const getApiRecipesAll = async () => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    return (response.data.results)
}
const getApiRecipes = async (name) => { //funcion para traer recetas POR NOMBRE de la API
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`)
    return (response.data.results);
}
const getApiRecipesDetail = async (id) => { //funcion para traer detalle de una receta de la API
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    return (response.data);
}
const getApiDiets = async () => { //funcion para traer tipo de dietas de la API
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    return (response.data.results);
}

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/recipes", async (req, res) => {
    const { name } = req.query; //se requiere el nombre a buscar por query
    const response = await getApiRecipes(name); //Por si hace un query con el nombre
    const allRecipesApi = await getApiRecipesAll(); //ocupo la funcion para traer las recetas de la api
    const objBd = await Recipe.findAll({
        include: [{ model: Diet }]
    })
    const allRecipesFormat = allRecipesApi.map((receta) => { //le damos formato para q solo muestre los 3 datos en la pag principal
        const obj = {
            id: receta.id,
            title: receta.title,
            image: receta.image,
            diets: receta.diets.map(d => { return { name: d } }),
        }
        return obj
    })
    const dbRecipe = await Recipe.findAll({ //buscar en la bd si hay alguna receta de las que se crean
        where: {
            title: {
                [Op.iLike]: `%${name}%` //busca lo mas cercano a lo que se pasa por name
            }
        },
        include: [{ model: Diet }]
    });
    const total = response.concat(dbRecipe)  //unir lo de la api con lo de la db
    try {
        if (!name) {
            res.status(200).json(allRecipesFormat.concat(objBd))
        }
        else if (response.length === 0) {
            res.status(400).send("no existe alguna receta para lo que buscas")
        }
        else {
            res.status(200).json(total)
        }
    } catch (error) {
        res.status(400).send("no existe alguna receta para lo que buscas")
    }
})
// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get("/recipes/:idRecipe", async (req, res) => { 
    const { idRecipe } = req.params;
    if (idRecipe.length > 9) {
        console.log("Entre al IF")
        try {
            const objDb = await Recipe.findByPk(idRecipe, { include: [{ model: Diet }] })
            res.status(200).json(objDb)
        }
        catch (error) {
            res.send(error)
        }
    }
    else {
        console.log("Entre al ELSE")
        try {
            const response = await getApiRecipesDetail(idRecipe);
            const obj = {
                id: response.id,
                title: response.title,
                summary: response.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthScore: response.healthScore,
                image: response.image,
                dishTypes: response.dishTypes,
                diets: response.diets.map(d => { return { name: d } }),
                instructions: response.instructions.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, "")
            }
            res.status(200).json(obj)
        }
        catch (error) {
            res.send(error)
        }
    }
})

// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
router.post("/recipes", async (req, res) => {
    const { title, summary, healthScore, instructions, diets } = req.body;
    if (!title || !summary) res.status(404).send("faltan datos necesarios")

    try {
        const nuevaReceta = await Recipe.create({
            title,
            summary,
            healthScore,
            instructions
        });
        await nuevaReceta.setDiets(diets) //<----- Seteo la relación de recipe con diet
        res.json(nuevaReceta);
    } catch (error) {
        res.status(404).send(error)
    }
})

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar 
//la base de datos con los tipos de datos indicados por spoonacular acá
router.get("/diets", async (req, res) => {
    try {
        const response = await getApiDiets(); //Traigo las diets de la Api
        const dietFilter = await response.map(e => {
            return {
                id: e.id,
                diets: e.diets.map(d => { return { name: d } })
            }
        })
        res.status(200).send("succes");
    } catch (error) {
        res.send(error)
    }
    const dbPrecharge = [{ "id": 1, "name": "Gluten Free" },
    { "id": 2, "name": "Low FODMAP" },
    { "id": 3, "name": "Ketogenic" },
    { "id": 4, "name": "Vegetarian" },
    { "id": 5, "name": "Lacto-Vegetarian" },
    { "id": 6, "name": "Ovo-Vegetarian" },
    { "id": 7, "name": "Vegan" },
    { "id": 8, "name": "Pescetarian" },
    { "id": 9, "name": "Paleo" },
    { "id": 10, "name": "Primal" },
    { "id": 11, "name": "Whole30" }]
    await Diet.bulkCreate(dbPrecharge); //precargo la db con las dietas
})

//listen puerto 3001
module.exports = router;
