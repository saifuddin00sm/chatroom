import { useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ChatViewHeader from "./ChatViewHeader";
import "./ChatView.css";
import MessageBox from "./MessageBox";
import { useGetChatContext } from "../../../context/getChatContext";

const ChatView = () => {
  const { chatInfo, chatInfoLoading, loadMoreMsgs} = useGetChatContext();
  const { chat_id, bot_id, latest_msg_list, chat_name, pinned } = chatInfo;
  const userData  = JSON.parse(localStorage.getItem("user_info"));
  const divRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop} = divRef.current;
    if (scrollTop === 0) {
      // User has scrolled to the top of the div
      loadMoreMsgs();
    }
  };


  // useEffect(() => {
  //   // This will automatically scroll to the bottom of the div when it loads or updates
  //   if (!chatInfoLoading) {
  //     const { scrollHeight, clientHeight } = divRef.current;
  //     divRef.current.scrollTo({
  //       top: scrollHeight - clientHeight,
  //     });
  //   }
  // }, [chatInfoLoading]);
  

  return (
    <div
      className={`chat_view_containers ${
        chatInfoLoading ? "flex-while-loading" : ""
      }`}
    >
      {chatInfoLoading ? (
        <div className="loader" style={{ width: "80px", height: "80px" }}></div>
      ) : (
        <>
          <ChatViewHeader
            chatName={chat_name}
            agentName={bot_id}
            chatId={chat_id}
            pinned={pinned}
          />
          <div className="msg_box" ref={divRef} onScroll={handleScroll}>
            {Array.isArray(latest_msg_list) ? (
              latest_msg_list.map((item) => {
                let msg;
                if (item?.sender_id === userData?.user_id) {
                  msg = (
                    <MessageBox
                      key={item?.msg_id}
                      type="receiver_msg"
                      position="left"
                      messageItems={item}
                    />
                  );
                } else {
                  msg = (
                    <MessageBox
                      key={item?.msg_id}
                      type="sender_msg"
                      position="right"
                      messageItems={item}
                    />
                  );
                }
                return msg;
              })
            ) : (
              <h5 style={{ textAlign: "center", marginTop: "50px" }}>
                No Messages found!
              </h5>
            )}
          </div>
          <div className="chat_view_bottom">
            <ChatInput />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatView;
