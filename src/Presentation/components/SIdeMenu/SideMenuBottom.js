import React from "react";
import icon_5 from "../../../assets/img/icon_5.png";
import icon_6 from "../../../assets/img/icon_6.png";
import icon_7 from "../../../assets/img/icon_7.png";
import "./SIdeMenu.css";

const SideMenuBottom = () => {
  return (
    <div className="navigation">
      <ul>
        <li className="nav_link">
          <img src={icon_5} alt="" className="img-fluid" />
        </li>
        <li className="nav_link">
          <img src={icon_6} alt="" className="img-fluid" />
        </li>
        <li className="nav_link">
          <img src={icon_7} alt="" className="img-fluid" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenuBottom;
