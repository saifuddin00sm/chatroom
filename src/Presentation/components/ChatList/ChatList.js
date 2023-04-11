import React, { useState, useEffect } from "react";
import PeopleList from "../PeopleList/PeopleList";
import BotList from "../BotList/BotList";
import './ChatList.css';
import { useGetChatContext } from "../../../context/getChatContext";
import { useBotContext } from "../../../context/botContext";

const ChatList = ({switchTab}) => {
const {getChatList} = useGetChatContext();
const {getBotList, botList} = useBotContext();
 
  useEffect(() => {
    getChatList('firstLoad');
    getBotList();
  }, []);
  
  return <>{switchTab === "bot" ? <BotList /> : <PeopleList />}</>;
};

export default ChatList;
