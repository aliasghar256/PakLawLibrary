import "./Home.css";
import React from "react";
import SearchBar from "./SearchBar";

export default function Home() {
  return (
    <div className="home">
      {/* <video autoPlay loop muted className="home-video">
        <source src="/videos/ocean.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="search-bar-logo-and-name-container">
        <div className="logo-and-name">
          <img className="logo" src="/prussianbluelogo.svg" alt="logo" />
          <h1 className="name">Pakistan Law Library</h1>
        </div>
        <SearchBar className="search-bar" />
      </div>
    </div>
  );
}
