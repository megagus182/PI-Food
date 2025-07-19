import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="image-wrapper">
        <NavLink to="/home">
          <button className="enter-button">Enter</button>
        </NavLink>
      </div>
    </div>
  );
}
