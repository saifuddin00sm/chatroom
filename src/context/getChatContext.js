import { useContext, createContext, useState, useEffect, useRef } from "react";
import {
  baseUrl,
  deleteChatUrl,
  getChatInfoUrl,
  getChatListUrl,
  getMsgsUrl,
  updateChatInfoUrl,
} from "../urls/urls";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const GetChatContext = createContext([]);

export const useGetChatContext = () => {
  return useContext(GetChatContext);
};

export const GetChatContextProvider = ({ children }) => {
  const [chatList, setChatlist] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInfoLoading, setChatInfoLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const [socket, setSocket] = useState(null);
  const [moreMsgLoading, setMoreMsgLoading] = useState(false);
  const [replyMsg, setReplyMsg] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(null);

  const handleReplyMsg = (msg) => {
    setReplyMsg(msg);
  };

  const socketActions = async (message) => {
    if (socket) {
      await socket.emit("message", message, function () {
        console.log("Text message sent successfully.");
      });
    }
  };

  const handleChat = async (chatId) => {
    if (chatId === chatInfo?.chat_id) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("chat_id", chatId);
    if (token) {
      try {
        setChatInfoLoading(true);
        const data = await fetch(baseUrl + getChatInfoUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const res = await data.json();
        if (data?.ok) {
          if (res.status === "success") {
            let msgs = Array.isArray(res.chat_info.latest_msg_list)
              ? res.chat_info.latest_msg_list.reverse()
              : null;
            setChatInfo({ ...res.chat_info, latest_msg_list: msgs });
            setChatInfoLoading(false);
            handleReplyMsg(null);
          } else {
            toast.error(res.error_msg, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setChatInfoLoading(false);
          }
        } else {
          toast.error(res.error_msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setChatInfoLoading(false);
        }
      } catch (error) {
        console.log(error);
        setChatInfoLoading(false);
      }
    }
  };

  const getChatList = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("token");
    if (userInfo && token) {
      const { user_id, current_space_id } = userInfo;

      const formData = new FormData();

      formData.append("user_id", user_id);
      formData.append("space_id", current_space_id);

      try {
        setChatLoading(true);
        const data = await fetch(baseUrl + getChatListUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const res = await data.json();
        if (res.status === "success") {
          setChatlist(res.chat_list);
          setChatLoading(false);
        } else {
          toast.error(res.error_msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setChatlist([]);
          setChatLoading(false);
        }
      } catch (error) {
        console.log(error);
        setChatLoading(false);
      }
    }
  };

  const loadMoreMsgs = async () => {
    try {
      const { chat_id, latest_msg_list } = chatInfo;
      const topMsgIndex = Array.isArray(latest_msg_list)
        ? latest_msg_list[0].msg_index
        : 0;

      if (topMsgIndex < 1) return;
      setMoreMsgLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("chat_id", chat_id);
      formData.append("last_msg_index", topMsgIndex);
      formData.append("limit", 20);

      const res = await fetch(baseUrl + getMsgsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setChatInfo((prev) => {
            if (
              prev.latest_msg_list !== null &&
              Array.isArray(prev.latest_msg_list)
            ) {
              // checks if there any duplicates msg
              const msgLi = [...prev.latest_msg_list, ...data.msg_list];
              const uniqueMessages = msgLi
                .filter(
                  (message, index, self) =>
                    index === self.findIndex((m) => m.msg_id === message.msg_id)
                )
                .sort(
                  (a, b) =>
                    new Date(a?.backend_utc_timestamp) -
                    new Date(b?.backend_utc_timestamp)
                );
              return {
                ...prev,
                latest_msg_list: uniqueMessages,
              };
            } else {
              return { ...prev, latest_msg_list: [...data.msg_list] };
            }
          });
          setMoreMsgLoading(false);
        } else {
          setMoreMsgLoading(false);
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 1000,
          });
        }
      } else {
        setMoreMsgLoading(false);
        toast.error("faild to get data", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      }
    } catch (error) {
      setMoreMsgLoading(false);
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
    }
  };

  const updateInfo = async (e, val, chatId, property) => {
    if (e) {
      e.preventDefault();
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append(property, val);

    if (token) {
      try {
        const data = await fetch(baseUrl + updateChatInfoUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const res = await data.json();
        if (data?.ok) {
          if (res.status === "success") {
            // Retriving the information after updating
            getChatList();
            handleChat(chatId);
          } else {
            toast.error(res.error_msg, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          toast.error(res.error_msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    const localToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("chat_id", chatId);

    setChatLoading(true)

    try {
      const res = await fetch(baseUrl + deleteChatUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localToken}` },
        body: formData,
      });

      const data = await res.json();

      if(res.ok){
        if(data.status === 'success'){
            setChatlist(chatList.filter((f)=> (f.chat_id !== chatId)));

            toast.success('Chat deleted', {position: 'top-center', autoClose:2000})
            setChatLoading(false)

        }else {
          toast.error(data?.error_msg, {position:'top-center', theme:'colored', autoClose: 3000})
              setChatLoading(false)
        }
      }else {
        toast.error('server error', {position:'top-center', theme:'colored', autoClose: 3000})
            setChatLoading(false)
      }
    } catch (error) {
      toast.error(error.message, {position:'top-center', theme:'colored', autoClose: 3000});
          setChatLoading(false)
    }
  };

  useEffect(() => {
    if (chatList.length) {
      let msgs = Array.isArray(chatList[0].latest_msg_list)
        ? chatList[0].latest_msg_list.reverse()
        : null;
      setChatInfo({ ...chatList[0], latest_msg_list: msgs });
    }
  }, [chatList]);

  const connectSocket = () => {
    const token = localStorage.getItem("token");

    const skt = io("http://13.56.163.152:5000", {
      query: { token: token },
      transports: ["websocket", "polling"],
    }); // replace with your server URL
    setSocket(skt);

    skt.on("connect", () => {
      console.log("Connected to server");
    });

    skt.on("message", function (msg) {
      setChatInfo((prev) => {
        if (
          prev.latest_msg_list !== null &&
          Array.isArray(prev.latest_msg_list)
        ) {
          // checks if there any duplicates msg
          const msgLi = [...prev.latest_msg_list, ...msg.msg_list];
          const uniqueMessages = msgLi.filter(
            (message, index, self) =>
              index === self.findIndex((m) => m.msg_id === message.msg_id)
          );
          return {
            ...prev,
            latest_msg_list: uniqueMessages,
          };
        } else {
          return { ...prev, latest_msg_list: [...msg.msg_list] };
        }
      });
    });
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <GetChatContext.Provider
      value={{
        getChatList,
        chatList,
        chatLoading,
        handleChat,
        chatInfo,
        chatInfoLoading,
        updateInfo,
        socketActions,
        connectSocket,
        disconnectSocket,
        loadMoreMsgs,
        moreMsgLoading,
        handleDeleteChat,
        handleReplyMsg,
        replyMsg,
        showReplyBox,
        setShowReplyBox,
      }}
    >
      {children}
    </GetChatContext.Provider>
  );
};
