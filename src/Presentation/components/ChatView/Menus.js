import React from "react";
import copyIcon from "../../../assets/img/copy-icon.svg";
import downloadIcon from "../../../assets/img/download-arrow.svg";
// import replyIcon from "../../../assets/img/reply-icon.svg";
import { useGetChatContext } from "../../../context/getChatContext";
import { VscReply } from "react-icons/vsc";
// import {toast} from 'react-toastify';
import copyToClipboard from "../../../utils/copyToClipboard";

const Menus = ({ msgs, type }) => {
  const { handleReplyMsg } = useGetChatContext();

  return (
    <div className="menus" style={{left: type === 'sender_msg' ? '18%' : '', right: type === 'receiver_msg' ? '-8%': ''}}>
      <ul>
        {msgs.msg_type === "text" && (
          <li
            onClick={() => copyToClipboard(msgs.text)}
            className="d-flex gap-2 align-items-center"
          >
            <div>
              <img src={copyIcon} alt="" />
            </div>
            <div>
              <span>Copy</span>
            </div>
          </li>
        )}
        {msgs.msg_type === "image" || msgs.msg_type === "file" ? (
          <li className="d-flex gap-2 align-items-center">
            <div>
              <img src={downloadIcon} alt="" />
            </div>
            <div>
              <a
                style={{ color: "unset", textDecoration: "none" }}
                href={
                  msgs.msg_type === "image"
                    ? msgs.image_url
                    : msgs.msg_type === "file" && msgs.file_url
                }
                download
              >
                Download
              </a>
            </div>
          </li>
        ) : (
          ""
        )}
        <li
          onClick={() =>
            handleReplyMsg(
              msgs.msg_type === "text"
                ? {msg: msgs.text, type: 'text', msgId: msgs.msg_id}
                : msgs.msg_type === "image"
                ? {msg: msgs.image_url, type: 'image', alt: msgs.image_name, msgId: msgs.msg_id}
                : msgs.msg_type === 'file' && {msg: msgs.file_name, type: 'file', msgId: msgs.msg_id}
            )
          }
          className="d-flex gap-2 align-items-center"
        >
          <div>
            <VscReply />
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
