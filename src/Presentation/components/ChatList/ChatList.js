import React, { useState, useEffect } from "react";
import PeopleList from "../PeopleList/PeopleList";
import BotList from "../BotList/BotList";
import './ChatList.css';
import { useGetChatContext } from "../../../context/getChatContext";

const ChatList = ({switchTab}) => {
const {getChatList} = useGetChatContext();
 
  useEffect(() => {
    getChatList('firstLoad');
  }, []);

  
  return <>{switchTab === "bot" ? <BotList /> : <PeopleList />}</>;
};

export default ChatList;
