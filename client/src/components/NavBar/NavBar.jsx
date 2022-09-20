import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <React.Fragment>
    <nav>
      <ul>
        <li>
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li><NavLink to={"/createRecipe"}>Create Recipe</NavLink></li>
      </ul>
    </nav>
    </React.Fragment>
  )
}
