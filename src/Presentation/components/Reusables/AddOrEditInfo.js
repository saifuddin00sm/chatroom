import React, { useEffect, useState } from "react";
import "./Reusables.css";
import { toast } from "react-toastify";
import { CgClose, CgCloseO } from "react-icons/cg";
// import user_avatar from "../../../assets/img/user_avatar_1.jpg";
import { useBotContext } from "../../../context/botContext";
import { baseUrl, uploadBotProfileUrl } from "../../../urls/urls";

const AddOrEditInfo = ({
  botName,
  botBio,
  profile_image_url,
  apiType,
  headerText,
  botId,
  closeHandler,
}) => {
  const [formState, setformState] = useState({
    botName: "",
    botBio: "",
    profile_image_url: "",
  });
  const [isImgLoading, setIsImgLoading] = useState(false);
  const { updateBotInfo, infoLoading, addBot } = useBotContext();

  const handleOnChange = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "profile_image_url") {
      value = e.target.files[0];
      const formData = new FormData();
      formData.append("profile_type", "bot");
      formData.append("image", value);

      try {
        const token = localStorage.getItem("token");
        setIsImgLoading(true);
        const res = await fetch(baseUrl + uploadBotProfileUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          if (data.status === "success") {
            value = data.image_url;
            setIsImgLoading(false);
          } else {
            toast.error(data.error_msg, {
              position: "top-center",
              theme: "colored",
              autoClose: 3000,
            });
            setIsImgLoading(false);
          }
        } else {
          toast.error("Unknown error", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          setIsImgLoading(false);
          console.log("server error");
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setIsImgLoading(false);
        console.log(error.message);
      }
    }
    setformState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { botName, botBio, profile_image_url } = formState;

    if (apiType === "update") {
      updateBotInfo(botName, botBio, botId, profile_image_url);
    } else {
      addBot(botName, botBio, profile_image_url);
    }
  };

  useEffect(() => {
    (function () {
      setformState({
        botName: botName || "",
        botBio: botBio || "",
        profile_image_url: profile_image_url || "",
      });
    })();
  }, [botName, botBio, profile_image_url]);

  return (
    <div className="comp_container" style={{width: '720px'}}>
      <div className="comp_header">
        <div className="header_text">{headerText}</div>
        <div className="header_close_btn" onClick={() => closeHandler(false)}>
          <CgClose
            style={{ height: "26px", width: "26px", cursor: "pointer" }}
            color="var(--color-text-primary)"
          />
        </div>
      </div>
      <div className="comp_body">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="profile_img_tag">profile image</div>
            <div
              className="mt-3 comp_profile_pic"
              style={{
                border: !formState.profile_image_url
                  ? "2px dashed var(--color-border)"
                  : "none",
              }}
            >
              {formState.profile_image_url ? (
                <img src={formState.profile_image_url} alt="profle_image" />
              ) : (
                <div className="img_upload_input">
                  <input
                    name="profile_image_url"
                    onChange={handleOnChange}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  />
                  {isImgLoading ? (
                    <div className="loader"></div>
                  ) : (
                    <p>Upload Image</p>
                  )}
                </div>
              )}
              {formState.profile_image_url && (
                <div
                  className="remove_img_btn"
                  onClick={() =>
                    setformState((prev) => ({ ...prev, profile_image_url: "" }))
                  }
                >
                  <CgCloseO
                    style={{
                      height: "24px",
                      width: "24px",
                      background: "#ffff",
                      borderRadius: "100%",
                    }}
                    color="#5D5D5D"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bot_form_control">
            <label htmlFor="botsname">Bot's Name</label>
            <input
              type="text"
              value={formState.botName}
              name="botName"
              onChange={handleOnChange}
              placeholder="Enter a bot name"
            />
          </div>

          <div className="bot_form_control">
            <label htmlFor="botsbio">Bio</label>
            <input
              type="text"
              value={formState.botBio}
              name="botBio"
              onChange={handleOnChange}
              placeholder="Enter bot bio"
            />
          </div>

          <div className="bot_form_btns">
            <button className="save_btn" type="submit">
              {infoLoading ? (
                <div
                  style={{
                    height: "25px",
                    width: "25px",
                    border: "3px solid #f3f3f3",
                    borderTop: "3px solid #0ca386",
                  }}
                  className="loader"
                ></div>
              ) : apiType === "update" ? (
                "Save"
              ) : (
                "Confirm"
              )}
            </button>
            <button onClick={() => closeHandler(false)} className="cancel_btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditInfo;
