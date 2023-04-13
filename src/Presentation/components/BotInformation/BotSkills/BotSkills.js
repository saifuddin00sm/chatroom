import React, { useEffect, useState } from "react";
import "./BotSkills.css";
import { useBotContext } from "../../../../context/botContext";
import BotSkillInfo from "./BotSkillInfo";
import { AiFillPlusCircle } from "react-icons/ai";
import BotSkillList from "./BotSkillList";
import QueryMarketPlaceSkillPopup from "./QueryMarketPlaceSkillPopup";
import Paginations from "../../Reusables/Paginations";

const BotSkills = () => {
  const {
    botSkillList,
    infoLoading,
    botSkillInfo,
    switchBotSkill,
    skillInfoLoading,
  } = useBotContext();

  const [isQuerySkill, setIsQuerSkill] = useState(false);

  useEffect(() => {
    switchBotSkill(botSkillList[0]?.skill_id);
  }, [botSkillList]);

  return (
    <>
      <div className="bot_skills_container">
        <div className="skill_list">
          <div className="skill_list_head">
            <div>
              <h4>Skill Management</h4>
              <p className="mb-0">
                Lorem ipsum dolor sit amet consectetur. Nisl lectus vitae
                hendrerit accumsan.
              </p>
            </div>
            <div className="add_skill_btn">
              <button onClick={() => setIsQuerSkill(true)}>
                <AiFillPlusCircle />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
          <div className="skills">
            {infoLoading ? (
              <div
                className="loader text-center m-auto"
                style={{ height: "40px", width: "40px" }}
              ></div>
            ) : botSkillList.length > 0 ? (
              <Paginations
                items={botSkillList}
                skillInfo={botSkillInfo}
                clickHandler={switchBotSkill}
                isPopup={false}
             />
              // botSkillList.map((skill) => (
              //   <div className="skill_parent" key={skill.skill_id}>
              //     <BotSkillList
              //       skillId={skill.skill_id}
              //       title={skill.version_name}
              //       desc={skill.version_description}
              //       version={skill.version}
              //       img={skill.version_profile_image_url}
              //       infoId={botSkillInfo?.skill_id}
              //       clickHandler={switchBotSkill}
              //     />
              //   </div>
              // ))
            ) : (
              <p className="mb-0 text-danger">No skills found!</p>
            )}
          </div>
        </div>
        <div style={{ width: "50%" }}>
          {botSkillInfo && (
            <BotSkillInfo
              botSkillInfo={botSkillInfo}
              settings={true}
              loading={skillInfoLoading}
            />
          )}
        </div>
      </div>
      {isQuerySkill && (
        <QueryMarketPlaceSkillPopup closeHandler={setIsQuerSkill} />
      )}
    </>
  );
};

export default BotSkills;
