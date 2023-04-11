import { useRef, useEffect, useState } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ChatViewHeader from "./ChatViewHeader";
// import "./ChatView.css";
import MessageBox from "./MessageBox";
import { useGetChatContext } from "../../../context/getChatContext";
import loadingAnim from "../../../assets/img/load-more-msg-anim.gif";
import chatLoadingAnim from "../../../assets/img/chat-loading.gif";
import { baseUrl, cleanChatContextUrl } from "../../../urls/urls";
import moment from "moment";

const ChatView = () => {
  const [isCleanLoading, setIsCleanLoading] = useState(false);
  const {
    chatInfo,
    firstLoadingChat,
    loadMoreMsgs,
    moreMsgLoading,
    isLoadMoreMsg,
  } = useGetChatContext();
  const { chat_id, bot_id, latest_msg_list, chat_name, pinned } = chatInfo;
  const userData = JSON.parse(localStorage.getItem("user_info"));
  // const divRef = useRef(null);
  const [preventScroll, setPreventScroll] = useState(false);

  const divRef = useRef();

  const handleScroll = () => {
    const { scrollTop } = divRef.current;
    if (scrollTop === 0) {
      // User has scrolled to the top of the div
      loadMoreMsgs();
    }
  };

  const handleCleanContext = async () => {
    const localToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("chat_id", chat_id);
    try {
      setIsCleanLoading(true);
      const res = await fetch(baseUrl + cleanChatContextUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${localToken}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        if (data.status === "success") {
          //do something
          console.log("got res");
          // const sessionEl = document.createElement('div')
          const msgContainer = document.querySelector(".msg_container");
          const sessionEl = document.createElement("div");
          sessionEl.className = "session_container";
          sessionEl.innerHTML = `
          <hr style="width: 100%;" />
          <p class="session_text">Session ended</p>
          <hr style="width: 100%;" />`;
          msgContainer.appendChild(sessionEl);
          setIsCleanLoading(false);
        } else {
          setIsCleanLoading(false);
          console.log(data.error_msg);
        }
      } else {
        setIsCleanLoading(false);
        console.log("server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setPreventScroll(false);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!isLoadMoreMsg) {
      // This will automatically scroll to the bottom of the div when it loads or updates
      divRef.current?.scrollTo({
        top: divRef?.current?.scrollHeight - divRef?.current?.clientHeight,
        behavior: "smooth",
      });
    }
  }, [latest_msg_list]);

  return (
    <div className="chat_view_containers">
      {firstLoadingChat ? (
        // <div className="loader" style={{ width: "80px", height: "80px" }}></div>
        <div className="loading_screen">
          <div>
            <img className="mb-3" src={chatLoadingAnim} alt="chat loading" />
            <p>Tasking.ai</p>
          </div>
        </div>
      ) : (
        <>
          <div className="app_header">
            <ChatViewHeader
              chatName={chat_name}
              agentName={bot_id}
              chatId={chat_id}
              pinned={pinned}
            />
          </div>
          <div
            className="msg_box"
            style={{ overflowY: preventScroll ? "hidden" : "auto" }}
            ref={divRef}
            onScroll={handleScroll}
          >
            {moreMsgLoading && (
              <div className="d-flex justify-center align-center gap-2 loading-giff">
                <img
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "100%",
                  }}
                  src={loadingAnim}
                  alt="loading animation"
                />
                <p className="mb-0" style={{ fontSize: "13px" }}>
                  Loading previous messages
                </p>
              </div>
            )}
            <div className="msg_container">
              {Array.isArray(latest_msg_list) ? (
                latest_msg_list.map((item) => {
                  let msg;

                  const formatDate = () => {
                    let formattedDate;

                    const dateStr = item?.backend_utc_timestamp;
                    const utcDate = moment.utc(dateStr);
                    const localDate = utcDate.local().format();

                    const date = moment(localDate);
                    const today = moment(new Date()).day();
                    const mmDate = date.format("h:mma, MMMM D");
                    const time = date.format("h:mma");
                    const dayOfWeek = date.day();

                    if (dayOfWeek !== today) {
                      formattedDate = mmDate;
                    } else {
                      formattedDate = time;
                    }

                    return formattedDate;
                  };

                  if (item?.sender_id === userData?.user_id) {
                    msg = (
                      <MessageBox
                        key={item?.msg_id}
                        type="receiver_msg"
                        position="left"
                        messageItems={item}
                        formattedDate={formatDate}
                        setPreventScroll={setPreventScroll}
                      />
                    );
                  } else {
                    msg = (
                      <MessageBox
                        key={item?.msg_id}
                        type="sender_msg"
                        position="right"
                        messageItems={item}
                        formattedDate={formatDate}
                        setPreventScroll={setPreventScroll}
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
          <div
            className="bottom_items"
          >
            <div className="chat_view_bottom">
              <ChatInput
                isCleanLoading={isCleanLoading}
                handleCleanContext={handleCleanContext}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatView;
