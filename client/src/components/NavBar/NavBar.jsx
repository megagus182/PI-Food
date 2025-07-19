import React from "react";
import { NavLink } from "react-router-dom";
import icon from "../../img/icon.png";
import recipeicon from "../../img/recipeicon.png";

export default function NavBar() {
  return (
    <nav className="bg-black bg-opacity-30 flex items-end w-full px-8 py-2 fixed top-0 z-50" role="navigation">
      <ul className="flex justify-between w-full max-w-6xl mx-auto">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-white text-md transition-all duration-200 ${
                isActive ? "font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white" : ""
              }`
            }
          >
            <img src={icon} alt="Home Icon" className="w-[40px] h-[40px] md:w-[55px] md:h-[55px]" />
            <span className="select-none">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/createRecipe"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-white text-md transition-all duration-200 ${
                isActive ? "font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white" : ""
              }`
            }
          >
            <img
              src={recipeicon}
              alt="Create Recipe Icon"
              className="w-[40px] h-[40px] md:w-[55px] md:h-[55px]"
            />
            <span className="select-none">Create Recipe</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
