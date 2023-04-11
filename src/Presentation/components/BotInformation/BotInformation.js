import React, { useState } from "react";
import BotSettings from "./BotSettings/BotSettings";
import BotSkills from "./BotSkills/BotSkills";
// import './BotInformation.css';

const BotInformation = () => {
  const [switchBotInfo, setSwitchBotInfo] = useState("settings");
  return (
    <div className="chat_view_containers" style={{ display: "block" }}>
      <div className="chat_view_header">
        <div className="chat_view_header_left">
          <button
            className={`bot_top_btn ${
              switchBotInfo === "skill" ? "bot_top_btns_selected" : ""
            }`}
            onClick={() => setSwitchBotInfo("skill")}
          >
            Skill
          </button>
          <button
            className={`bot_top_btn ${
              switchBotInfo === "settings" ? "bot_top_btns_selected" : ""
            }`}
            onClick={() => setSwitchBotInfo("settings")}
          >
            Settings
          </button>
        </div>
        <div className="chat_view_header_right"></div>
      </div>
      <div className="bot_infos" style={{overflowY: 'auto', height: '93%'}}>
        {switchBotInfo === "settings" ? <BotSettings /> : <BotSkills />}
      </div>
    </div>
  );
};

export default BotInformation;
