import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import icon from "../../img/icon.png";
import recipeicon from "../../img/recipeicon.png";

export default function NavBar() {
  return (
    <React.Fragment>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to={"/home"} className="navhome">
              <img src={icon} className="icon" alt="dfg" />
              <span className="span">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/createRecipe"} className="navcreate">
              <img src={recipeicon} className="icon" alt="dfg" />
              <span className="span">Create Recipe</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
