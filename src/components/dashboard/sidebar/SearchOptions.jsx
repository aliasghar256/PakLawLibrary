import React from "react";
import "./SearchOptions.css";

export default function SearchOptions({ setSearchBarIndex }) {
  return (
    <div className="sidebar-container">
      <div>
        <button className="sidebar-button" onClick={() => setSearchBarIndex(0)}>Keyword Search</button>
      </div>
      <div>
        <button className="sidebar-button" onClick={() => setSearchBarIndex(1)}>Advanced Search</button>
      </div>
    </div>
  );
}