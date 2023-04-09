import React from "react";
import user_avatar from "../../../assets/img/user_avatar_1.jpg";
import icon_1 from "../../../assets/img/icon_1.png";
// import icon_2 from "../../../assets/img/icon_2.png";
import bot_icon from "../../../assets/img/bot-icon.svg";
// import icon_4 from "../../../assets/img/icon_4.png";
import "./SIdeMenu.css";

const SideMenuTop = ({setSwitchTab, switchTab}) => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return (
    <div className="navigation">
      <ul>
        <li className="user_avatar">
          <img src={userInfo && userInfo.profile_image_url ? userInfo.profile_image_url : user_avatar} alt="User_Avatar" className="img-fluid" />
        </li>
        <li className={`nav_link ${switchTab === 'people' ? 'active': ''}`} onClick={()=> setSwitchTab('people')}>
          <img src={icon_1} alt="" className="img-fluid" />
        </li>
        {/* <li className="nav_link">
          <img src={icon_2} alt="" className="img-fluid" />
        </li> */}
        <li className={`nav_link ${switchTab === 'bot' ? 'active': ''}`} onClick={()=> setSwitchTab('bot')}>
          <img src={bot_icon} alt="" className="img-fluid" />
        </li>
        {/* <li className="nav_link">
          <img src={icon_4} alt="" className="img-fluid" />
        </li> */}
      </ul>
    </div>
  );
};

export default SideMenuTop;
