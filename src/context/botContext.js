import { useContext, createContext, useState, useEffect } from "react";
import { baseUrl, getBotlistUrl } from "../urls/urls";
import { updateBotUrl } from "../urls/urls";
import { toast } from "react-toastify";

export const BotCotext = createContext([]);

export const useBotContext = () => {
  return useContext(BotCotext);
};

export const BotContextProvider = ({ children }) => {
  const [botList, setBotList] = useState([]);
  const [botInfo, setBotInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);

  const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("user_info"));
  };

  const getBotList = async () => {
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");
    const limit = 100;
    const offset = 0;

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("limit", limit);
    formData.append("offset", offset);

    try {
      const res = await fetch(baseUrl + getBotlistUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setBotList(data.bot_list);
        } else {
          console.log(data.error_msg);
          setBotList([]);
        }
      } else {
        console.log("server error");
        setBotList([]);
      }
    } catch (error) {
      setBotList([]);
      console.log(error.message);
    }
  };

  const switchBot = (botId) => {
    const bot = botList.find((f) => f.bot_id === botId);
    setBotInfo(bot);
  };

  const updateBotInfo = async (nameVal, bioVal, botId, profile_image_url) => {
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("space_id", current_space_id);
    formData.append("name", nameVal);
    formData.append("bio", bioVal);
    formData.append("bot_id", botId);
    formData.append("profile_image_url", profile_image_url);

    try {
      setInfoLoading(true);
      const res = await fetch(baseUrl + updateBotUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setBotInfo((prev) => ({
            ...prev,
            name: nameVal,
            bio: bioVal,
            bot_id: botId,
          }));

          setBotList(
            botList.map((bot) =>
              bot?.bot_id === botId
                ? { ...bot, name: nameVal, bio: bioVal }
                : bot
            )
          );
          toast.success('Info Updated!', {
            position: 'top-center',
            autoClose: 2000
          });
          setInfoLoading(false);
        } else {
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setInfoLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setInfoLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  const addBot = ()=> {
    console.log('bot added')
  }

  useEffect(() => {
    if (botList.length) {
      setBotInfo(botList[0]);
    }
  }, [botList]);

  return (
    <BotCotext.Provider
      value={{
        botList,
        getBotList,
        botInfo,
        switchBot,
        updateBotInfo,
        infoLoading,
        addBot
      }}
    >
      {children}
    </BotCotext.Provider>
  );
};
