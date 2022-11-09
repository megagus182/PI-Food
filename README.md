# Individual Project - Food


![CapturaFood](https://user-images.githubusercontent.com/108184057/200721890-1d602705-5b45-455e-b43f-f34a24f5553d.PNG)


## Proyecto

- App utlizando React, Redux, Node y Sequelize.

La idea general de mi proyecto fue crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

- Buscar recetas
- Filtrarlos / Ordenarlos
- Crear nuevas recetas propias

#### Tecnologías

- React
- Redux
- Express
- Sequelize - Postgres

## Frontend

![CapturaFood2](https://user-images.githubusercontent.com/108184057/200722011-d51cd7a7-5ba3-4a65-9b06-bf7e4aeefdba.PNG)

En el Home se puede encontrar
- Input de búsqueda para encontrar recetas por nombre
- Área donde se ve el listado de recetas:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- Botones/Opciones para filtrar por por tipo de dieta
- Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
- Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

![CapturaFood3](https://user-images.githubusercontent.com/108184057/200722351-f7f29148-c6d6-43b6-b06f-387efc52ccd8.PNG)

En la Ruta de detalle de una receta: 

- Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- Resumen del plato
- Nivel de "comida saludable" (health score)
- Paso a paso (instrucciones)

![CapturaFood4](https://user-images.githubusercontent.com/108184057/200722506-00a71d8f-836b-4a9f-adeb-cd0cd0545581.PNG)

Ruta de creación de recetas: 

-Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- Posibilidad de seleccionar/agregar uno o más tipos de dietas
- Botón/Opción para crear una nueva receta

## Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- Receta con las siguientes propiedades:
  - ID:
  - Nombre 
  - Resumen del plato 
  - Nivel de "comida saludable" (health score)
  - Paso a paso
-Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre
  
## Backend

Se desarrollo un servidor en Node/Express con las siguientes rutas:

- __GET /recipes?name="..."__
- __GET /recipes/{idReceta}__
- __POST /recipes__
- __GET /diets__
