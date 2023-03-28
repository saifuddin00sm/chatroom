import React, { useEffect, useState } from "react";
import pin_icon_2 from "../../../assets/img/pin_icon_2.png";
import pin_filled_icon from "../../../assets/img/pin-filled.svg";
// import three_dots_icon from "../../../assets/img/three_dots_icon.png";
// import { IoIosArrowForward } from "react-icons/io";
import { useGetChatContext } from "../../../context/getChatContext";
import "./ChatViewHeader";
import { RiDeleteBin6Line } from "react-icons/ri";

const ChatViewHeader = ({ chatName, agentName, chatId, pinned }) => {
  const [inputVal, setInputVal] = useState("");
  const { updateInfo, handleDeleteChat } = useGetChatContext();

  const handlePin = () => {
    const pins = pinned ? false : true;
    updateInfo(null, pins, chatId, "pinned");
  };

  useEffect(() => {
    setInputVal(chatName);
  }, [chatName, pinned]);

  return (
    <div className="chat_view_header">
      <div className="chat_view_header_left">
        {/* <div className="avatar_container">
          <img
            src={user_avatar}
            alt="User_Avatar"
            className="img-fluid w-100 h-100"
          />
        </div> */}
        {/* <p className="user_name">{agentName}</p>
        <IoIosArrowForward className="right_arrow_icon" /> */}
        <form onSubmit={(e) => updateInfo(e, inputVal, chatId, "name")}>
          <input
            onChange={(e) => setInputVal(e.target.value)}
            className="chat_header_input"
            value={inputVal}
            style={{ width: "230px" }}
          />
        </form>
      </div>
      <div className="chat_view_header_right">
        <div onClick={handlePin}>
          <img
            src={pinned ? pin_filled_icon : pin_icon_2}
            alt="pin_icon"
            className="img-fluid w-100 h-100"
          />
        </div>
        <div onClick={()=> handleDeleteChat(chatId)} style={{cursor: 'pointer'}}>
          {/* <img
            src={three_dots_icon}
            alt="menu_icon"
            className="img-fluid w-100 h-100"
          /> */}
          <RiDeleteBin6Line
            style={{ height: "23px", width: "23px", color: "#747070" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatViewHeader;
