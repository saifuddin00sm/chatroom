import React from "react";
import not_started_icon from "../../../assets/img/not_started_icon.png";
import "./TaskList.css";

const SIngleTask = () => {
  return (
    <div className="task_card">
      <div className="task_card_top">
        <div className="tag_box">
          <img src={not_started_icon} alt="Not_Started" />
          Not Started
        </div>
      </div>
      <div className="task_card_bottom">
        <h4 className="task_title">Reduce Sales costs</h4>
        <p className="task_desc">Placeholder for card text.</p>
      </div>
    </div>
  );
};

export default SIngleTask;
