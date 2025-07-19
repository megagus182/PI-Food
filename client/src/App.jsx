import React from "react";
import NavBar from './components/NavBar/NavBar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home";
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar/SearchBar';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';

function App() {
  return (   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={
          <>
            <NavBar />
            <SearchBar />
            <Home />
          </>
        } />
        <Route path="/createRecipe" element={<CreateRecipe />} />
        <Route path="/detail/:id" element={
          <>
          <NavBar/>
          <Detail />
          </>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
