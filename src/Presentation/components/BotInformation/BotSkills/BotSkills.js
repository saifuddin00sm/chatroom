import React from "react";
import { useEffect } from "react";
import "./BotSkills.css";
import { useBotContext } from "../../../../context/botContext";
import BotSkillInfo from "./BotSkillInfo";
import { AiFillPlusCircle } from "react-icons/ai";
import BotSkillList from "./BotSkillList";

const BotSkills = () => {
  const { getBotSkillList, botSkillList } = useBotContext();
  useEffect(() => {
    getBotSkillList();
  }, []);

  return (
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
            <button>
              <AiFillPlusCircle />
              <span>Add Skill</span>
            </button>
          </div>
        </div>
        <div className="skills">
          {botSkillList.length > 0 ? (
            botSkillList.map((skill) => (
              <div className="skill_parent" key={skill.skill_id}>
                <BotSkillList
                  title={skill.version_name}
                  desc={skill.version_description}
                  version={skill.version}
                  img={skill.version_profile_image_url}
                />
              </div>
            ))
          ) : (
            <p>No skills found!</p>
          )}
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <BotSkillInfo />
      </div>
    </div>
  );
};

export default BotSkills;
