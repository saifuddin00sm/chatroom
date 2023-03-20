import React, { useEffect } from "react";
import search_icon from "../../../assets/img/search_icon.png";
import add_icon from "../../../assets/img/add_icon.png";
import user_avatar from "../../../assets/img/bots_avatar.jpg";
import pin_icon from "../../../assets/img/pin_icon.png";
import pin_filled_icon from "../../../assets/img/pin-filled.svg";
import Input from "../../common/Input/Input";
// import ChatListModel from "../../../models/ChatListModel";
import "./ChatList.css";
import { useGetChatContext } from "../../../context/getChatContext";
import formatTime from "../../../utils/formatTime";

const ChatList = () => {
  const { chatList, getChatList, chatLoading, handleChat} =
    useGetChatContext();

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="chat_list_container">
      <div className="search_container">
        <div className="search_left">
          <div>
            <img src={search_icon} alt="Search_Icon" className="img-fluid" />
          </div>
          <Input placeholderText={"Search"} />
        </div>
        <button className="add_btn">
          <img src={add_icon} alt="Add_Icon" className="img-fluid" />
        </button>
      </div>

      {/* CHAT BOX */}
      <div className="all_chats_container" style={{display: chatLoading && 'flex', justifyContent: chatLoading && 'center'}}>
        {chatLoading ? (
          <div
            style={{
              width: "45px",
              height: "45px",
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
                    <div className="user_avatar_box">
                      <img
                        src={user_avatar}
                        alt="User_Avatar"
                        className="img-fluid"
                      />
                    </div>
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
                            : "No Messages" : 'No Messages'
                          }
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
    </div>
  );
};

export default ChatList;
