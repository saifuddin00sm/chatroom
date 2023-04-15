import React from "react";
import SIdeMenu from "../components/SIdeMenu/SIdeMenu";
import ChatList from "../components/ChatList/ChatList";
import ChatView from "../components/ChatView/ChatView";
// import './Pages.css';

const Chat = () => {
  return (
    <div className="d-flex">
      <SIdeMenu />
      <ChatList />
      <ChatView />
    </div>
  );
};

export default Chat;
