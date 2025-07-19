import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanFilter, getRecipeSearch } from "../../actions";
import Loading from "../Loading";

export default function SearchBar({ onSearchActive }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ name: "" });

  function handleChange(e) {
    const value = e.target.value;
    setSearch({ ...search, name: value });

    if (onSearchActive) {
      onSearchActive(value.trim().length > 0);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!search.name.trim()) return;

    setLoading(true);
    dispatch(cleanFilter());
    dispatch(getRecipeSearch(search.name)).then(() => {
      setLoading(false);
      if (onSearchActive) onSearchActive(true);
    });
    setSearch({ name: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white bg-opacity-80 px-4 py-2 rounded shadow-md w-full max-w-lg"
    >
      <input
        type="text"
        name="search"
        value={search.name}
        onChange={handleChange}
        placeholder="Search recipes..."
        className="flex-1 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors"
      >
        Search
      </button>
      {loading && <Loading />}
    </form>
  );
}
