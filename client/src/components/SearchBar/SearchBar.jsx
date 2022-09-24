import React from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getRecipeSearch } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    name: "",
  });
  function handleChange(e) {
    setSearch({
      ...search,
      name: e.target.value,
    });
    console.log(search.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeSearch(search.name));
  }

  return (
    <div className="search">
      <div className="search-box">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-text"
            onChange={handleChange}
            name="search"
            value={search.name}
            placeholder="Write a recipe to search"
            type="text"
          />
          <button className="search-button" type="submit">
            <span>Search!</span>
          </button>
        </form>
      </div>
    </div>
  );
}
