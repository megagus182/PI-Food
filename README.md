# 🍽️ Food App

Una aplicación web para explorar, buscar y crear recetas saludables. Esta app consume la API de [Spoonacular](https://spoonacular.com/food-api), permitiéndote ver detalles completos de recetas, filtrarlas por tipo de dieta y crear tus propias recetas personalizadas.

---

## 🚀 Tecnologías utilizadas

- ⚡ **Vite** – Bundler ultrarrápido para React
- ⚛️ **React**
- 🎨 **Tailwind CSS** – Estilado moderno y responsivo
- 📦 **Redux** – Manejo de estado global
- 🌐 **Spoonacular API** – Fuente de datos externa (gratuita con límite diario)
- 💬 **React Router DOM** – Navegación SPA
- 🧪 **Axios / Fetch** – Consumo de APIs
- 🛠️ **Node.js / Express (opcional si hay backend)**

---

## 📷 Preview

![landing](./screenshots/landing.png)
![home](./screenshots/home.png)
![detail](./screenshots/detail.png)

---

## 📂 Estructura del proyecto

```bash
📁 src
│
├── 📁 assets           # Imágenes, iconos
├── 📁 components       # Componentes reutilizables (Navbar, Cards, etc.)
├── 📁 pages            # Landing, Home, Detail, CreateRecipe
├── 📁 redux            # Actions y reducers
├── 📁 styles           # Archivos de estilos (si no usas Tailwind puro)
├── App.jsx
├── main.jsx
└── index.css
