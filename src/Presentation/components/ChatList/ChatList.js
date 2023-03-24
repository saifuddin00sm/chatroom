import React, { useEffect } from "react";
import add_icon from "../../../assets/img/add_icon.png";
import pin_icon from "../../../assets/img/pin_icon.png";
import pin_filled_icon from "../../../assets/img/pin-filled.svg";
// import ChatListModel from "../../../models/ChatListModel";
import "./ChatList.css";
import { useGetChatContext } from "../../../context/getChatContext";
import { useAuthContext } from "../../../context/authContext";
import formatTime from "../../../utils/formatTime";
import upgradeIcons from "../../../assets/img/Upgrade-Outline.png";
import inviteIcons from "../../../assets/img/Invite-Outline.png";
import settingIcons from "../../../assets/img/setting.png";
import logoutIcons from "../../../assets/img/logout.png";
import creditIcon from "../../../assets/img/credit1.png";

const ChatList = () => {
  const { chatList, getChatList, chatLoading, handleChat } =
    useGetChatContext();
  const { handleLogout } = useAuthContext();
  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="chat_list_container">
      <div className="search_container">
        <div className="search_left">
          <div className="profile_img">
            {userInfo?.first_name?.charAt(0) + userInfo?.last_name?.charAt(0)}
          </div>
          <div className="user_name">
            {userInfo?.first_name + " " + userInfo?.last_name}
            {/* Saif uddin */}
          </div>
        </div>
        <button className="add_btn">
          <img src={add_icon} alt="Add_Icon" className="img-fluid" />
        </button>
      </div>

      {/* CHAT BOX */}
      <div className="all_chats_container">
        <div
          style={{
            display: chatLoading && "flex",
            justifyContent: chatLoading && "center",
          }}
        >
          {chatLoading ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                marginTop: "20px",
              }}
              className="loader"
            ></div>
          ) : (
            chatList.length > 0 &&
            chatList.map((chats) => {
              const { chat_name, chat_id, pinned, latest_msg_list } = chats;
              return (
                <div
                  onClick={() => handleChat(chat_id)}
                  className="chat_box_container"
                  key={chat_id}
                >
                  <div className="chat_box">
                    <div className="chat_box_left">
                      {/* <div className="user_avatar_box">
                        <img
                          src={user_avatar}
                          alt="User_Avatar"
                          className="img-fluid"
                        />
                      </div> */}
                      <div className="content">
                        <h5 className="user_name">{chat_name}</h5>
                        <p className="last_text">
                          {latest_msg_list !== null
                            ? latest_msg_list[latest_msg_list?.length - 1]
                                ?.msg_type === "text"
                              ? latest_msg_list[
                                  latest_msg_list?.length - 1
                                ]?.text.slice(0, 20) + "..."
                              : latest_msg_list[latest_msg_list?.length - 1]
                                  ?.msg_type === "image"
                              ? latest_msg_list[latest_msg_list?.length - 1]
                                  ?.image_name
                              : latest_msg_list[latest_msg_list?.length - 1]
                                  ?.msg_type === "file"
                              ? latest_msg_list[latest_msg_list?.length - 1]
                                  ?.file_name
                              : "No Messages"
                            : "No Messages"}
                        </p>
                      </div>
                    </div>
                    <div className="chat_box_right">
                      <p className="date_time">
                        {latest_msg_list !== null
                          ? formatTime(
                              latest_msg_list[latest_msg_list.length - 1]
                                ?.backend_utc_timestamp
                            )
                          : "00:00"}
                      </p>
                      <div>
                        <img
                          src={pinned ? pin_filled_icon : pin_icon}
                          alt="pin_icon"
                          className="img-fluid pin_icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="chats_bottom">
          <div className="chat_bottom_items d-flex gap-2 align-items-center">
            <div style={{ width: "36px", height: "36px" }}>
              <img style={{height: '100%', width: '100%', objectFit: 'cover'}} src={creditIcon} alt="" />
            </div>
            <div className="col-10">
              <div className="credit_heading d-flex justify-content-between">
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

          <div className="chat_bottom_items">
            <button class="chat_bottom_buttons">
              <img src={upgradeIcons} alt="" />
              <span>Upgrade now</span>
            </button>
          </div>
          <div className="chat_bottom_items">
            <button class="chat_bottom_buttons">
              <img src={inviteIcons} alt="" />
              <span>Invite a friend</span>
            </button>
          </div>
          <div className="chat_bottom_items">
            <button class="chat_bottom_buttons">
              <img src={settingIcons} alt="" />
              <span>Settings</span>
            </button>
          </div>
          <div className="chat_bottom_items">
            <button onClick={handleLogout} class="chat_bottom_buttons">
              <img src={logoutIcons} alt="" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
