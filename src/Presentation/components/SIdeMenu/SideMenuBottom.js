import { useEffect } from "react";
import icon_5 from "../../../assets/img/icon_5.png";
import icon_6 from "../../../assets/img/icon_6.png";
import icon_7 from "../../../assets/img/icon_7.png";
import { useGetChatContext } from "../../../context/getChatContext";
import SettingMenu from "../SettingMenu/SettingMenu";
import "./SIdeMenu.css";

const SideMenuBottom = () => {
  const { setShowSettingsMenu, showSettingsMenu } = useGetChatContext();

  useEffect(() => {
    const handleClick = () => {
      setShowSettingsMenu(false);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="sideMenu_bottom">
      <div className="navigation">
        <ul>
          <li className="nav_link">
            <img src={icon_5} alt="" className="img-fluid" />
          </li>
          <li className="nav_link">
            <img src={icon_6} alt="" className="img-fluid" />
          </li>
          <li
            className="nav_link"
            onClick={(e) => {
              e.stopPropagation();
              setShowSettingsMenu(true);
            }}
          >
            <img src={icon_7} alt="" className="img-fluid" />
          </li>
        </ul>
      </div>
      {showSettingsMenu && <SettingMenu />}
    </div>
  );
};

export default SideMenuBottom;
