import React from "react";
import user_avatar from "../../../assets/img/user_avatar_1.jpg";
import icon_1 from "../../../assets/img/icon_1.png";
import icon_2 from "../../../assets/img/icon_2.png";
import icon_3 from "../../../assets/img/icon_3.png";
import icon_4 from "../../../assets/img/icon_4.png";
import "./SIdeMenu.css";

const SideMenuTop = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return (
    <div className="navigation">
      <ul>
        <li className="user_avatar">
          <img src={userInfo && userInfo.profile_image_url ? userInfo.profile_image_url : user_avatar} alt="User_Avatar" className="img-fluid" />
        </li>
        <li className="nav_link active">
          <img src={icon_1} alt="" className="img-fluid" />
        </li>
        <li className="nav_link">
          <img src={icon_2} alt="" className="img-fluid" />
        </li>
        <li className="nav_link">
          <img src={icon_3} alt="" className="img-fluid" />
        </li>
        <li className="nav_link">
          <img src={icon_4} alt="" className="img-fluid" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenuTop;
