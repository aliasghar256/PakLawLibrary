import "./Home.css";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import PakistanMap from "./map/PakistanMap";
import pakistanGeoJson from "./geoBoundaries-PAK-ADM1_simplified.geojson"; // Update the path accordingly
import Header from "./header_footer/Header";
import Auth from "./auth/Auth";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="home">
      <Header setShowLogin={setShowLogin} />
      <div className="search-bar-logo-and-name-container">
        <div className="logo-and-name">
          <img className="logo" src="/prussianbluelogo.svg" alt="logo" />
          <h1 className="name">Pakistan Law Library</h1>
        </div>
        <SearchBar className="search-bar" />
      </div>
      {showLogin && <Auth />}
      <div>
        <h1>Map of Pakistan</h1>
        <PakistanMap geoJsonData={pakistanGeoJson} />
      </div>
    </div>
  );
}
