import { useRef, useState, useEffect } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ChatViewHeader from "./ChatViewHeader";
import "./ChatView.css";
import MessageBox from "./MessageBox";
import { useGetChatContext } from "../../../context/getChatContext";
import loadingAnim from '../../../assets/img/load-more-msg-anim.gif';
import chatLoading from '../../../assets/img/chat-loading.gif';

const ChatView = () => {
  const { chatInfo, chatInfoLoading, loadMoreMsgs, moreMsgLoading} = useGetChatContext();
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


  useEffect(() => {
    // This will automatically scroll to the bottom of the div when it loads or updates
    if (!chatInfoLoading) {
      const { scrollHeight, clientHeight } = divRef.current;
      divRef.current.scrollTo({
        top: scrollHeight - clientHeight,
      });
    }
  }, [chatInfoLoading]);
  
  // console.log(latest_msg_list)

  return (
    <div
      className={`chat_view_containers ${
        chatInfoLoading ? "flex-while-loading" : ""
      }`}
    >
      {chatInfoLoading ? (
        // <div className="loader" style={{ width: "80px", height: "80px" }}></div>
      <div className="loading_screen">
        <img className="mb-3" src={chatLoading} alt="chat loading" />
        <p>
        Tasking.ai
        </p>
      </div>
      ) : (
        <>
          <ChatViewHeader
            chatName={chat_name}
            agentName={bot_id}
            chatId={chat_id}
            pinned={pinned}
          />
          <div className="msg_box" ref={divRef} onScroll={handleScroll}>
            {moreMsgLoading && <div className="d-flex justify-center align-center gap-2 loading-giff">
              <img style={{height: '20px', width: '20px', borderRadius: '100%'}} src={
                loadingAnim
              } alt="loading animation"/>
              <p className="mb-0" style={{fontSize: '13px'}}>Loading previous messages</p>
            </div>}
            <div className="msg_container">
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
