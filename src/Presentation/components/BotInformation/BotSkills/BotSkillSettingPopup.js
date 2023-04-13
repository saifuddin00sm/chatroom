import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useBotContext } from "../../../../context/botContext";

const styles = {
  height: "100vh",
  width: "100%",
  position: "absolute",
  top: "0",
  left: 0,
  background: "rgba(0, 0, 0, 0.50)",
  zIndex: "1000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BotSkillSettingPopup = ({ closeHander, auto_update, short_command, skill_id }) => {
  const [formState, setFormState] = useState({
    short_command: short_command,
    auto_update: auto_update,
    skill_id: skill_id
  });
  const {updateSkillConfig, updateConfigLoading} = useBotContext();

  const handleChange = (e) => {
    let value = null;

    if (e.target.name === "auto_update") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setFormState((prev) => ({ ...prev, [e.target.name]: value }));
  };


  const handleSubmit = (e)=> {
    e.preventDefault();
    updateSkillConfig(formState);
  }
  return (
    <div style={styles}>
      <div className="comp_container" style={{ width: "720px" }}>
        <div className="comp_header">
          <div className="header_text">Skills settings</div>
          <div className="header_close_btn" onClick={() => closeHander(false)}>
            <CgClose
              style={{ height: "26px", width: "26px", cursor: "pointer" }}
              color="var(--color-text-primary)"
            />
          </div>
        </div>
        <div className="comp_body">
          <form onSubmit={handleSubmit}>
            <div className="auto_update mb-3">
              <div className="sectHead">Bot's Name</div>
              <div className="mt-2">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formState.auto_update}
                    onChange={handleChange}
                    name="auto_update"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="short_command">
              <div className="sectHead mb-2">Short command</div>
              <div className="bot_form_control">
                {/* <label htmlFor="botsbio">Bio</label> */}
                <input
                  type="text"
                  value={formState?.short_command}
                  onChange={handleChange}
                  name="short_command"
                />
              </div>
            </div>
            <div className="bot_form_btns">
              <button className="save_btn" type="submit">
                {updateConfigLoading ? <div className="loader"></div> : "Confirm"}
              </button>
              <button onClick={() => closeHander(false)} className="cancel_btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BotSkillSettingPopup;
