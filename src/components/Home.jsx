import "./Home.css";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import PakistanMap from "./map/PakistanMap";
import pakistanGeoJson from "./geoBoundaries-PAK-ADM1_simplified.geojson"; // Update the path accordingly
import PakistanMap2 from "./map/PakistanMap2";

export default function Home() {
  const [content, setContent] = useState("");
  return (
    <div className="home">
      <div className="search-bar-logo-and-name-container">
        <div className="logo-and-name">
          <img className="logo" src="/prussianbluelogo.svg" alt="logo" />
          <h1 className="name">Pakistan Law Library</h1>
        </div>
        <SearchBar className="search-bar" />
      </div>
      <div>
        <h1>Map of Pakistan</h1>
        <PakistanMap geoJsonData={pakistanGeoJson} />
      </div>
    </div>
  );
}
