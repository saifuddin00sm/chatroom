import React from "react";
import add_icon from "../../../assets/img/add_icon.png";
import user_avatar from "../../../assets/img/user_avatar_1.jpg";

const BotList = () => {
  return (
    <div className="chat_list_container">
      <div className="search_container">
        <div className="search_left">
          <div className="profile_img">
            {/* {userInfo?.first_name?.charAt(0) + userInfo?.last_name?.charAt(0)} */}
            SU
          </div>
          <div className="user_name">
            {/* {userInfo?.first_name + " " + userInfo?.last_name} */}
            Saif uddin
          </div>
        </div>
        <button className="add_btn">
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
          {/* chatList.length > 0 &&
              chatList.map((chats) => {
                const { chat_name, chat_id, pinned, latest_msg_list } = chats;
                return ( */}
          <div className="chat_box_container selected">
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
                  <h5 className="user_name">Bot name</h5>
                  <p className="last_text">Bot bio...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotList;
