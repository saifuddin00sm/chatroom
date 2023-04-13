import { useContext, createContext, useState, useEffect } from "react";
import {
  addBotUrl,
  baseUrl,
  getBotSkillInfoUrl,
  getBotSkillListUrl,
  getBotlistUrl,
  manageBotSkillUrl,
  queryMarketplaceInfoUrl,
  queryMarketplaceUrl,
  updateBotSkillConfigUrl,
} from "../urls/urls";
import { updateBotUrl } from "../urls/urls";
import { toast } from "react-toastify";

export const BotCotext = createContext([]);

export const useBotContext = () => {
  return useContext(BotCotext);
};

export const BotContextProvider = ({ children }) => {
  const [botList, setBotList] = useState([]);
  const [botInfo, setBotInfo] = useState({});
  const [botSkillInfo, setBotSkillInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [skillInfoLoading, setSkillInfoLoading] = useState(false);
  const [queryListLoading, setQueryListLoading] = useState(false);
  const [queryInfoLoading, setQeuryInfoLoading] = useState(false);
  const [updateConfigLoading, setUpdateConfigLoading] = useState(false);
  const [isAddNewBot, setIsAddNewBot] = useState(false);
  const [botSkillList, setBotSkillList] = useState([]);
  const [queryMakarketSkillList, setQueryMakarketSkillList] = useState([]);
  const [queryMakarketSkillInfo, setQueryMakarketSkillInfo] = useState(null);

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
    getBotSkillList(bot.bot_id);
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
            profile_image_url: profile_image_url,
          }));

          setBotList(
            botList.map((bot) =>
              bot?.bot_id === botId
                ? {
                    ...bot,
                    name: nameVal,
                    bio: bioVal,
                    profile_image_url: profile_image_url,
                  }
                : bot
            )
          );
          toast.success("Info Updated!", {
            position: "top-center",
            autoClose: 2000,
          });
          setIsAddNewBot(false);
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

  const addBot = async (nameVal, bioVal, profile_image_url) => {
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("space_id", current_space_id);
    formData.append("name", nameVal);
    formData.append("bio", bioVal);
    formData.append("profile_image_url", profile_image_url);

    try {
      setInfoLoading(true);
      const res = await fetch(baseUrl + addBotUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          const newBot = data.bot_info;
          setBotList((prev) => [...prev, newBot]);
          toast.success("New Bot Added!", {
            position: "top-center",
            autoClose: 2000,
          });
          setInfoLoading(false);
          setIsAddNewBot(false);
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

  async function switchBotSkill(skillId) {
    const skill = botSkillList.find((f) => f.skill_id === skillId);
    setBotSkillInfo(skill);
    if (!skillId) return;
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("bot_id", botInfo?.bot_id);
    formData.append("skill_id", skillId);

    try {
      setSkillInfoLoading(true);
      const res = await fetch(baseUrl + getBotSkillInfoUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (data.status === "success") {
          setBotSkillInfo(data.bot_skill_info);
          setSkillInfoLoading(false);
        } else {
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setSkillInfoLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setSkillInfoLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      setSkillInfoLoading(false);
    }
  }

  const switchQuerySkill = async (skillId) => {
    const skill = queryMakarketSkillList.find((f) => f.skill_id === skillId);
    setQueryMakarketSkillInfo(skill);
    if (!skillId) return;
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("bot_id", botInfo?.bot_id);
    formData.append("skill_id", skillId);

    try {
      setQeuryInfoLoading(true);
      const res = await fetch(baseUrl + queryMarketplaceInfoUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (data.status === "success") {
          setQueryMakarketSkillInfo(data.bot_skill_info);
          setQeuryInfoLoading(false);
        } else {
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setQeuryInfoLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setQeuryInfoLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      setQeuryInfoLoading(false);
    }
  };

  const getBotSkillList = async (botId) => {
    setBotSkillInfo(null);
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");
    const limit = 100;
    const offset = 0;

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("bot_id", botId);
    formData.append("limit", limit);
    formData.append("offset", offset);

    try {
      setInfoLoading(true);
      const res = await fetch(baseUrl + getBotSkillListUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setBotSkillList(data.bot_skill_list);
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
      setInfoLoading(false);
    }
  };

  const manageBotSkill = async (action, skill_id) => {
    const token = localStorage.getItem("token");
    const { current_space_id } = getUserInfo();
    const { bot_id } = botInfo;

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("bot_id", bot_id);
    formData.append("skill_id", skill_id);
    formData.append("action", action);

    try {
      const res = await fetch(baseUrl + manageBotSkillUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          if (action === "disable") {
            const fillteredSkills = botSkillList.filter(
              (skill) => skill.skill_id !== skill_id
            );
            setBotSkillList(fillteredSkills);
          } else {
            const querySkill = queryMakarketSkillList.find(
              (f) => f.skill_id === skill_id
            );
            setBotSkillList((prev) => [...prev, querySkill]);
          }
          toast.success(
            `${
              action === "disable"
                ? "Skill disabled successfully!"
                : "Skill enabled successfully!"
            }`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
        } else {
          toast.error(data.error_msg, {
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

  const updateSkillConfig = async ({
    short_command,
    auto_update,
    skill_id,
  }) => {
    const token = localStorage.getItem("token");
    const { current_space_id } = getUserInfo();
    const { bot_id } = botInfo;

    const formData = new FormData();

    formData.append("space_id", current_space_id);
    formData.append("bot_id", bot_id);
    formData.append("skill_id", skill_id);
    formData.append("shortcut_command", short_command);
    formData.append("auto_update", auto_update);

    try {
      setUpdateConfigLoading(true);
      const res = await fetch(baseUrl + updateBotSkillConfigUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          setBotSkillInfo((prev) => ({
            ...prev,
            auto_update: auto_update,
            shortcut_command: short_command,
          }));
          setUpdateConfigLoading(false);
          toast.success("Config updated!", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setUpdateConfigLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setUpdateConfigLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      setUpdateConfigLoading(false);
    }
  };

  const getQuerySkillList = async (query) => {
    const { bot_id } = botInfo;
    const { current_space_id } = getUserInfo();
    const token = localStorage.getItem("token");
    const limit = 10;
    const offset = 0;

    const formData = new FormData();

    if (query) {
      formData.append("query", query);
    }
    formData.append("space_id", current_space_id);
    formData.append("bot_id", bot_id);
    formData.append("limit", limit);
    formData.append("offset", offset);

    try {
      setQueryListLoading(true);
      const res = await fetch(baseUrl + queryMarketplaceUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (data.status === "success") {
          setQueryMakarketSkillList(data.skill_list);
          setQueryListLoading(false);
        } else {
          toast.error(data.error_msg, {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setQueryListLoading(false);
        }
      } else {
        toast.error("server error", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setQueryListLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      setQueryListLoading(false);
    }
  };

  useEffect(() => {
    if (botList.length) {
      setBotInfo(botList[0]);
      getBotSkillList(botList[0].bot_id);
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
        addBot,
        isAddNewBot,
        setIsAddNewBot,
        botSkillList,
        getBotSkillList,
        switchBotSkill,
        botSkillInfo,
        skillInfoLoading,
        manageBotSkill,
        queryMakarketSkillList,
        queryMakarketSkillInfo,
        getQuerySkillList,
        switchQuerySkill,
        queryInfoLoading,
        queryListLoading,
        updateSkillConfig,
        updateConfigLoading
      }}
    >
      {children}
    </BotCotext.Provider>
  );
};
