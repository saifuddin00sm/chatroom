import React from "react";
import copyIcon from "../../../assets/img/copy-icon.svg";
import downloadIcon from "../../../assets/img/download-arrow.svg";
import replyIcon from "../../../assets/img/reply-icon.svg";
import { useGetChatContext } from "../../../context/getChatContext";

const Menus = ({ msgs }) => {
  const {handleReplyMsg} = useGetChatContext();
  console.log("from menus", msgs);

  function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    tempElement.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  }

  // const replyMsgHandler = ()=> {
  //   console.log('clicked for reply msg')
  // }

  return (
    <div className="menus">
      <ul>
      {msgs.msg_type === "text" && (
        <li onClick={() => copyToClipboard(msgs.text)} className="d-flex gap-2 align-items-center">
          <div>
            <img src={copyIcon} alt="" />
          </div>
          <div>
            <span>Copy</span>
          </div>
        </li>)}
        {msgs.msg_type === 'image' || msgs.msg_type === 'file' ?
        <li className="d-flex gap-2 align-items-center">
          <div>
            <img src={downloadIcon} alt="" />
          </div>
          <div>
          <a style={{color: 'unset', textDecoration: 'none'}} href={msgs.msg_type === 'image' ? msgs.image_url : msgs.msg_type === 'file' && msgs.file_url} download>Download</a>
          </div>
        </li>: ''}
        <li onClick={()=> handleReplyMsg(msgs.text)} className="d-flex gap-2 align-items-center">
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
