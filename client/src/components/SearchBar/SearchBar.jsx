import React from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { cleanFilter, getRecipeSearch } from "../../actions";
import Loading from "../Loading";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    e.preventDefault();
    dispatch(cleanFilter())
    dispatch(getRecipeSearch(search.name)).then(recipe =>{
      setLoading(false)});
      setSearch({
        ...search,
        name: "",
      });
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
          <div className="searchLoading"> {loading && <Loading/>}</div>
        </form>
      </div>
    </div>
  );
}
