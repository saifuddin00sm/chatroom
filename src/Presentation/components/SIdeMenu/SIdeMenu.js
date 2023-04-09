import React from "react";
import "./SIdeMenu.css";
import SideMenuBottom from "./SideMenuBottom";
import SideMenuTop from "./SideMenuTop";

const SIdeMenu = ({setSwitchTab, switchTab}) => {
  return (
    <nav className="side-menu-container">
      <SideMenuTop setSwitchTab={setSwitchTab} switchTab={switchTab}/>
      <SideMenuBottom />
    </nav>
  );
};

export default SIdeMenu;
