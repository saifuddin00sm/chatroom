import React from "react";
import copyIcon from "../../../assets/img/copy-icon.svg";
import downloadIcon from "../../../assets/img/download-arrow.svg";
import replyIcon from "../../../assets/img/reply-icon.svg";

const Menus = () => {
  return (
    <div className="menus">
      <ul>
        <li className="d-flex gap-2 align-items-center">
          <div>
            <img src={copyIcon} alt="" />
          </div>
          <div>
            <span>Copy</span>
          </div>
        </li>
        <li className="d-flex gap-2 align-items-center">
          <div>
            <img src={downloadIcon} alt="" />
          </div>
          <div>
            <span>Download</span>
          </div>
        </li>
        <li className="d-flex gap-2 align-items-center">
          <div>
            <img src={replyIcon} alt="" />
          </div>
          <div>
            <span>Reply</span>
          </div>
        </li>
        {/* <li>Download</li> */}
      </ul>
    </div>
  );
};

export default Menus;
