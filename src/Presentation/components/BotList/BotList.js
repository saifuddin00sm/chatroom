import React from "react";
import add_icon from "../../../assets/img/add_icon.png";
import user_avatar from "../../../assets/img/user_avatar_1.jpg";
import { useBotContext } from "../../../context/botContext";
const BotList = () => {
  const { botList, botInfo, switchBot, setIsAddNewBot } = useBotContext();
  return (
    <div className="chat_list_container">
      <div className="search_container">
        <div className="search_left">
          {/* <div className="profile_img">
            {userInfo?.first_name?.charAt(0) + userInfo?.last_name?.charAt(0)}
            SU
          </div> */}
          <div className="user_name">
            {/* {userInfo?.first_name + " " + userInfo?.last_name} */}
            Bot
          </div>
        </div>
        <button className="add_btn" onClick={()=> setIsAddNewBot(true)}>
          <img src={add_icon} alt="Add_Icon" className="img-fluid" />
        </button>
      </div>

      {/* bot list here */}

      <div className="all_chats_container">
        <div
          className="chat_box_main"
          style={{
            // display: chatLoading && "flex",
            // justifyContent: chatLoading && "center",
            overflowY: "auto",
          }}
        >
          {/* {chatLoading ? (
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  marginTop: "20px",
                }}
                className="loader"
              ></div>
            ) : ( */}
          {botList.length > 0 ? (
            botList.map((bot) => {
              return (
                <div className={`chat_box_container ${bot?.bot_id === botInfo?.bot_id ? 'selected': ''}`} key={bot?.bot_id} onClick={()=> switchBot(bot?.bot_id)}>
                  <div className="chat_box">
                    <div className="chat_box_left">
                      <div className="user_avatar_box">
                        <img
                          src={bot.profile_image_url ? bot.profile_image_url : user_avatar}
                          alt="User_Avatar"
                          className="img-fluid"
                        />
                      </div>
                      <div className="content">
                        <h5 className="user_name">{bot?.name}</h5>
                        <p className="last_text">{bot?.bio ? bot.bio.slice(0, 30) + '...' : 'No bio...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No bot found!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotList;
