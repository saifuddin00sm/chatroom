import React from 'react';
import { useAuthContext } from "../../../context/authContext";
// import formatTime from "../../../utils/formatTime";
// import upgradeIcons from "../../../assets/img/Upgrade-Outline.png";
import inviteIcons from "../../../assets/img/Invite-Outline.png";
// import settingIcons from "../../../assets/img/setting.png";
import logoutIcons from "../../../assets/img/logout.png";
import creditIcon from "../../../assets/img/credit1.png";
// import { BsPinAngle } from "react-icons/bs";
// import BotPopupList from "../BotPopupList/BotPopupList";
// import { useBotContext } from "../../../context/botContext";

// import UpgradeModal from "./Modals/UpgradeModal";
// import InviteModal from "./Modals/InviteModal";

const SettingMenu = () => {
    const { handleLogout } = useAuthContext();
  return (
    <div className="chats_bottom">
    <div className="chat_bottom_items">
      <button className="chat_bottom_buttons">
        <img src={inviteIcons} alt="" />
        <span>User Settings</span>
      </button>
    </div>
    <div className="chat_bottom_items">
      <button className="chat_bottom_buttons">
        <img src={inviteIcons} alt="" />
        <span>Space Settings</span>
      </button>
    </div>
    <div className="chat_bottom_items">
      <button className="chat_bottom_buttons">
        <img src={inviteIcons} alt="" />
        <span>Bot Settings</span>
      </button>
    </div>

    <div className="chat_bottom_items d-flex gap-2 align-items-center">
      <div style={{ width: "20px", height: "10px" }}>
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          src={creditIcon}
          alt=""
        />
      </div>
      <div className="col-10">
        <div
          className="credit_heading d-flex justify-content-between"
          style={{ fontSize: "14px" }}
        >
          <p className="mb-0">Credit Left</p>
          <p className="mb-0">400/500</p>
        </div>
        <progress
          className="credit_progress"
          value="400"
          max="500"
        ></progress>
      </div>
    </div>
    <hr style={{ margin: "0px 0px" }} />
    {/* <div className="chat_bottom_items">
                    <button
                      onClick={() => setIsUpgradeModal(true)}
                      className="chat_bottom_buttons"
                    >
                      <img src={upgradeIcons} alt="" />
                      <span>Upgrade now</span>
                    </button>
                  </div>
                  <div className="chat_bottom_items">
                    <button
                      onClick={() => setIsInviteModal(true)}
                      className="chat_bottom_buttons"
                    >
                      <img src={inviteIcons} alt="" />
                      <span>Invite a friend</span>
                    </button>
                  </div>
                  <div className="chat_bottom_items">
                    <button className="chat_bottom_buttons">
                      <img src={settingIcons} alt="" />
                      <span>Settings</span>
                    </button>
                  </div> */}
    <div className="chat_bottom_items">
      <button onClick={handleLogout} className="chat_bottom_buttons">
        <img src={logoutIcons} alt="" />
        <span>Logout</span>
      </button>
    </div>
  </div>
  )
}

export default SettingMenu