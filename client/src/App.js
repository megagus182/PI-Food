import './App.css';
import React from "react";
import NavBar from './components/NavBar/NavBar.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar/SearchBar';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Filter from './components/Filter/Filter';

function App() {
  return (
   
    <BrowserRouter>
      <div className="App">
        <Route exact path="/"><LandingPage/></Route>
        <Route path="/home"><NavBar/></Route>
        <Route path="/home"><SearchBar/></Route>
        <Route path="/home"><Home /></Route>
        <Route path="/home"><Filter/></Route>
        <Route path="/createRecipe"><CreateRecipe /></Route>
        <Route path="/detail/:id"><Detail /></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
