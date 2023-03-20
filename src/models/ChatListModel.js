const ChatListModel = (data) => {
  const {
    chat_id,
    bot_id,
    chat_name,
    max_msg_index,
    read_msg_index,
    pinned,
    updated_utc_timestamp,
    latest_msg_list,
  } = data;

  return {
    chat_id,
    bot_id,
    chat_name,
    max_msg_index,
    read_msg_index,
    pinned,
    updated_utc_timestamp,
    latest_msg_list,
  };
};

export default ChatListModel;
