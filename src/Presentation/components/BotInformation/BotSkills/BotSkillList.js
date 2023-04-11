import React from "react";
import gCloudIcon from '../../../../assets/img/g-cloud-icon.png';

const BotSkillList = ({title, desc, version, img}) => {
  return (
    <div className="skill">
      <div className="d-flex gap-3 align-items-center">
        <div className="skill_img">
          <img src={img || gCloudIcon} alt="img" />
        </div>
        <div>
          <div className="skill_title">{title}</div>
          <p className="mb-0 skill_desc">{desc.slice(0, 95) + '...'}</p>
        </div>
      </div>
      <div className="skill_version">{version}</div>
    </div>
  );
};

export default BotSkillList;
