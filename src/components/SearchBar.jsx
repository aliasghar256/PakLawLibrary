//SearchBar.jsx
import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        placeholder="Search... "
        className="search-input"
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
