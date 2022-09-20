import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="food">
        <h1>FOOD APP</h1>
        <NavLink to="/home"><h3>HOME</h3></NavLink>
      </div>
      <div className="home">
      </div>
    </div>
  );
}
