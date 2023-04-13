import React from "react";
import gCloudIcon from "../../../../assets/img/g-cloud-icon.png";
import { useBotContext } from "../../../../context/botContext";

const BotSkillList = ({
  title,
  desc,
  version,
  img,
  skillId,
  infoId,
  clickHandler,
  isPopup,
}) => {
  const { manageBotSkill, botSkillList } = useBotContext();

  const isMatch = botSkillList.some((skills) => skills.skill_id === skillId);
  return (
    <div
      className={`skill ${infoId === skillId ? "selected" : ""}`}
      onClick={() => clickHandler(skillId)}
    >
      <div className="d-flex gap-3 align-items-center">
        <div className="skill_img">
          <img src={img || gCloudIcon} alt="img" />
        </div>
        <div>
          <div className="skill_title">{title}</div>
          <p className="mb-0 skill_desc">{desc.slice(0, 95) + "..."}</p>
        </div>
      </div>
      <div className="skill_version">
        <div style={{ textAlign: "right" }}>{version}</div>
        {isPopup && (
          <button
          disabled={isMatch}
            onClick={(e) => {
              e.stopPropagation();
              manageBotSkill("enable", skillId);
            }}
            className="enable_or_disable_btn"
          >
            {isMatch ? "Enabled" : "Enable"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BotSkillList;
