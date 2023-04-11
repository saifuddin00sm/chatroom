import React from "react";
import ChatView from "./ChatView/ChatView";
import BotInformation from "./BotInformation/BotInformation";
import './AppleftView.css';


 const AppLeftView = ({ switchTab }) => {
  return (
    <>{switchTab === "people" ? <ChatView /> : <BotInformation />}</>
  );
};

export default AppLeftView;