import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { useBotContext } from "../../../../context/botContext";
import BotSkillSettingPopup from "./BotSkillSettingPopup";
import accountCircle from "../../../../assets/img/account_circle_off.svg";

const BotSkillInfo = ({ botSkillInfo, settings, loading, isPopup }) => {
  const [tabs, setTabs] = useState(settings ? "settings" : "overview");
  const { manageBotSkill, botSkillList } = useBotContext();

  const isMatch = botSkillList.some(
    (skills) => skills?.skill_id === botSkillInfo?.skill_id
  );
  return (
    <div
      className={`bot_skill_info_container ${
        loading ? "skill_info_loading" : ""
      }`}
    >
      {loading ? (
        <div style={{ height: "40px", width: "40px" }} className="loader"></div>
      ) : (
        <>
          <div>
            <div className="bot_skill_info_head">
              <div className="d-flex gap-3 align-items-center">
                <div className="skill_info_img">
                  <img src={botSkillInfo?.version_profile_image_url} alt="" />
                </div>
                <div>
                  <h4 className="mb-1">{botSkillInfo?.version_name}</h4>
                  <a
                    className="skill_provider"
                    href={botSkillInfo?.skill_provider}
                  >
                    {botSkillInfo?.skill_provider}
                  </a>
                </div>
              </div>
              <div>
                {!isPopup && (
                  <>
                    <button
                      onClick={() =>
                        manageBotSkill("disable", botSkillInfo?.skill_id)
                      }
                      className="skill_info_enable_handler"
                    >
                      <img src={accountCircle} alt="" />
                      <span>Disable</span>
                    </button>
                    <div
                      className="mt-2 skill_version"
                      style={{ textAlign: "right" }}
                    >
                      {botSkillInfo?.version}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3">
              {isPopup ? (
                <div className="d-flex gap-3 align-items-center">
                  <button
                  disabled={isMatch}
                    onClick={() =>
                      manageBotSkill("enable", botSkillInfo?.skill_id)
                    }
                    className="enable_or_disable_btn mt-0"
                  >
                    {isMatch ? "Enabled" : "Enable"}
                  </button>
                  <div className="skill_version">{botSkillInfo?.version}</div>
                </div>
              ) : (
                <p className="skill_desc" style={{ width: "80%" }}>
                  {botSkillInfo?.version_description}
                </p>
              )}
            </div>
          </div>

          <div className="skill_info_tabs">
            {settings && (
              <button
                onClick={() => setTabs("settings")}
                className={`${tabs === "settings" ? "active" : ""}`}
              >
                Settings
              </button>
            )}
            <button
              onClick={() => setTabs("overview")}
              className={`${tabs === "overview" ? "active" : ""}`}
            >
              Overview
            </button>
            <button
              onClick={() => setTabs("whatsNew")}
              className={`${tabs === "whatsNew" ? "active" : ""}`}
            >
              What's New
            </button>
          </div>

          <div className="skill_infos">
            {settings && tabs === "settings" ? (
              <Settings
                auto_update={botSkillInfo?.auto_update}
                config_json={botSkillInfo?.config_json}
                config_schema={botSkillInfo?.config_schema}
                short_command={botSkillInfo?.shortcut_command}
                skill_id={botSkillInfo?.skill_id}
              />
            ) : tabs === "overview" ? (
              <Overview version_overview={botSkillInfo?.version_overview} />
            ) : (
              <Features
                version_new_feature={botSkillInfo?.version_new_feature}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BotSkillInfo;

const Settings = ({
  auto_update,
  config_json,
  config_schema,
  short_command,
  skill_id
}) => {
  const [isChecked, setIsChecked] = useState(auto_update);
  const [inputState, setInputState] = useState(auto_update);
  const [isSettingOpen, setIsSettingOpen] = useState(false);


  useEffect(() => {
    setIsChecked(auto_update);
    setInputState(short_command);
  }, [auto_update, short_command])
  
  return (
    <div className="mt-4">
      <div className="settings_opts mb-4">
        <div className="settings_opt_head d-flex align-items-center justify-content-between">
          <h4 className="mb-0">Preferences</h4>
          <div
            className="d-flex align-items-center gap-2 bot_info_edit_btn"
            onClick={() => setIsSettingOpen(true)}
          >
            <div>
              <BiEdit style={{ height: "20px", width: "20px" }} />
            </div>
            <div>
              <span>Edit</span>
            </div>
          </div>
        </div>
        <div>
          <div className="auto_update mb-3">
            <div className="sectHead">Auto Update</div>
            <div className="mt-2">
              <label className="switch">
                <input
                  type="checkbox"
                  readOnly
                  disabled
                  checked={isChecked}
                  // onChange={() => setIsChecked(!isChecked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="short_command">
            <div className="sectHead">Short command</div>
            <div>
              <input
                type="text"
                value={inputState}
                readOnly
                // onChange={() => console.log("input change")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* configuration settings */}
      <div className="settings_opts">
        <div className="settings_opt_head d-flex align-items-center justify-content-between">
          <h4 className="mb-0">Configuration</h4>
          <div
            className="d-flex align-items-center gap-2 bot_info_edit_btn"
            // onClick={() => setIsEdit(true)}
          >
            <div>
              <BiEdit style={{ height: "20px", width: "20px" }} />
            </div>
            <div>
              <span>Edit</span>
            </div>
          </div>
        </div>
        <div>
          <div className="config_settings">config settings</div>
        </div>
      </div>

      {isSettingOpen && (
        <BotSkillSettingPopup
          closeHander={setIsSettingOpen}
          auto_update={auto_update}
          short_command={short_command}
          skill_id={skill_id}
        />
      )}
    </div>
  );
};
const Overview = ({ version_overview }) => {
  return <div className="mt-4">{version_overview}</div>
};
const Features = ({ version_new_feature }) => {
  return <div className="mt-4">{version_new_feature}</div>
};
