import { useContext, createContext, useState, useEffect } from "react";
import {
  addChatUrl,
  baseUrl,
  deleteChatUrl,
  // getChatInfoUrl,
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
  const [firstLoadingChat, setFirstLoadingChat] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const [socket, setSocket] = useState(null);
  const [moreMsgLoading, setMoreMsgLoading] = useState(false);
  const [replyMsg, setReplyMsg] = useState(null);
  const [isLoadMoreMsg, setIsLoadMoreMsg] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const handleReplyMsg = (msg) => {
    setReplyMsg(msg);
  };

  const socketActions = async (message) => {
    setIsLoadMoreMsg(false);
    if (socket) {
      await socket.emit("message", message, function () {
        console.log("Text message sent successfully.");
      });
    }
  };

  const handleChat = async (chatId) => {
    if (chatId === chatInfo?.chat_id) return;

    const chat = chatList.find((f) => f.chat_id === chatId);
    let msgs = Array.isArray(chat.latest_msg_list)
      ? chat.latest_msg_list.sort((a, b) => new Date(a.backend_utc_timestamp) - new Date(b.backend_utc_timestamp))
      : null;

    setChatInfo({ ...chat, latest_msg_list: msgs });
    handleReplyMsg(null);
  };

  const getChatList = async (param) => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("token");
    if (userInfo && token) {
      const { user_id, current_space_id } = userInfo;

      const formData = new FormData();

      formData.append("user_id", user_id);
      formData.append("space_id", current_space_id);

      try {
        if(param === 'firstLoad'){
          setFirstLoadingChat(true);
        }
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
          if(param === 'firstLoad'){
            setFirstLoadingChat(false);
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
          setChatlist([]);
          setChatLoading(false);
           if(param === 'firstLoad'){
      setFirstLoadingChat(false);
    }
        }
      } catch (error) {
        console.log(error);
        setChatLoading(false);
         if(param === 'firstLoad'){
      setFirstLoadingChat(false);
    }
      }
    }
  };

  const loadMoreMsgs = async () => {
    setIsLoadMoreMsg(true);
    try {
      const { chat_id, latest_msg_list } = chatInfo;
      const topMsgIndex = Array.isArray(latest_msg_list)
        ? latest_msg_list[0].msg_index
        : 0;
        console.log(latest_msg_list, topMsgIndex);
        const isMsgFirst = latest_msg_list?.some((f)=> (f.msg_index === 0));
        
      if (isMsgFirst || latest_msg_list === null) return;
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

  const addNewChat = async (botName) => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const localToken = localStorage.getItem("token");

    const spaceId = userInfo?.current_space_id;

    const formData = new FormData();

    formData.append("space_id", spaceId);
    formData.append("bot_id", "tfajwm1qko0prx82");
    formData.append("chat_name", `new chat with ${botName}`);

    try {
      const res = await fetch(baseUrl + addChatUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "success") {
          getChatList();
        } else {
          toast.error(data?.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteChat = async (chatId) => {
    const localToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("chat_id", chatId);

    setChatLoading(true);

    try {
      const res = await fetch(baseUrl + deleteChatUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${localToken}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setChatlist(chatList.filter((f) => f.chat_id !== chatId));

          toast.success("Chat deleted", {
            position: "top-center",
            autoClose: 2000,
          });
          setChatLoading(false);
        } else {
          toast.error(data?.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setChatLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setChatLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      setChatLoading(false);
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

    skt.on("message", function (msg) 
    {
      console.log('msg runs')
      setIsLoadMoreMsg(false);
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
        firstLoadingChat,
        isLoadMoreMsg,
        updateInfo,
        socketActions,
        connectSocket,
        disconnectSocket,
        loadMoreMsgs,
        moreMsgLoading,
        handleDeleteChat,
        handleReplyMsg,
        replyMsg,
        addNewChat,
        showSettingsMenu,
        setShowSettingsMenu
      }}
    >
      {children}
    </GetChatContext.Provider>
  );
};
