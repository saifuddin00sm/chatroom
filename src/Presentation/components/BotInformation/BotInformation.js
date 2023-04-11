import React, { useState } from "react";
import BotSettings from "./BotSettings/BotSettings";
import BotSkills from "./BotSkills/BotSkills";
// import './BotInformation.css';
import { useBotContext } from "../../../context/botContext";
import AddOrEditInfo from "../Reusables/AddOrEditInfo";

const BotInformation = () => {
  const [switchBotInfo, setSwitchBotInfo] = useState("settings");
  const { isAddNewBot, setIsAddNewBot } = useBotContext();

  return isAddNewBot ? (
    <div style={{width: '100%', height: '100%'}}>
      <AddOrEditInfo closeHandler={setIsAddNewBot} headerText='Add New Bot' apiType='add'/>
    </div>
  ) : (
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
      <div className="bot_infos" style={{ overflowY: "auto", height: "93%" }}>
        {switchBotInfo === "settings" ? <BotSettings /> : <BotSkills />}
      </div>
    </div>
  );
};

export default BotInformation;
