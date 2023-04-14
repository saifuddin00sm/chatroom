import React from "react";
import { useBotContext } from "../../../context/botContext";
import user_avatar from "../../../assets/img/user_avatar_2.png";
import "./BotPopupList.css";

const BotPopupList = ({ clickHandler }) => {
  const { botList } = useBotContext();
  return (
    <div className="botPopup_container">
      {botList.length ? (
        botList.map((bot) => (
          <div
            onClick={() => clickHandler(bot?.name)}
            key={bot?.bot_id}
            className="d-flex gap-2 align-items-center mb-2 popup_bots"
          >
            <div className="botPopup_profile_img">
              <img src={bot?.profile_image_url || user_avatar} alt="" />
            </div>
            <div>{bot?.name}</div>
          </div>
        ))
      ) : (
        <p>No bot found</p>
      )}
    </div>
  );
};

export default BotPopupList;
