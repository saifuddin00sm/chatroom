import React from "react";
import "./SIdeMenu.css";
import SideMenuBottom from "./SideMenuBottom";
import SideMenuTop from "./SideMenuTop";

const SIdeMenu = () => {
  return (
    <nav className="side-menu-container">
      <SideMenuTop />
      <SideMenuBottom />
    </nav>
  );
};

export default SIdeMenu;
