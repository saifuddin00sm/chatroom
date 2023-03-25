import React from "react";
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
          <li onClick={() => copyToClipboard(msgs.text)}>Copy</li>
        )}{" "}
        <li onClick={()=> handleReplyMsg(msgs.text)}>Reply</li>
          {msgs.msg_type === 'image' || msgs.msg_type === 'file' ? <li>
            <a style={{color: 'unset', textDecoration: 'none'}} href={msgs.msg_type === 'image' ? msgs.image_url : msgs.msg_type === 'file' && msgs.file_url} download>Download</a>
          </li> : ''}
      </ul>
    </div>
  );
};

export default Menus;
