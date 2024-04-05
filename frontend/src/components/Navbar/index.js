import React from "react";
import "./index.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="flex" style={{columnGap: "24px"}}>
      <div className="logo">
        <img src="/logo.svg" />
      </div>
      <div className="nav-items">
        <div className="nav-item">How to Animate ▾</div>
        <div className="nav-item">Business ▾</div>
        <div className="nav-item">Education ▾</div>
        <div className="nav-item">Social Media ▾</div>
        <div className="nav-item">Pricing</div>
        <div className="nav-item">About Us</div>
      </div>
    </div>
    <button className="get-started">Get Started</button>
  </nav>
);

export default Navbar;
