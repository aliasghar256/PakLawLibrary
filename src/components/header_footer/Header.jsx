import React, { useState } from "react";
import "./Header.css"; // Ensure this file is in the same directory

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="header">
      <a href="/" className="logo-link">
        <div className="logo-and-company-name">
          <div className="logo-container">
            {/* Assuming you have your logo image in the public directory */}
            <img src="/prussianbluelogo.svg" alt="Logo" />
          </div>
          <h1 className="company-name">Pakistan Law Library</h1>
        </div>
      </a>
      <button className="menu-toggle" onClick={toggleNav}>
        Menu
      </button>
      <span className="nav-container">
        <nav className={`navbar ${isNavVisible ? "show" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </span>
    </header>
  );
};

export default Header;
