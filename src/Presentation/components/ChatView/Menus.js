import React from "react";
import copyIcon from "../../../assets/img/copy-icon.svg";
import downloadIcon from "../../../assets/img/download-arrow.svg";
// import replyIcon from "../../../assets/img/reply-icon.svg";
import { useGetChatContext } from "../../../context/getChatContext";
import { VscReply } from "react-icons/vsc";
// import {toast} from 'react-toastify';
import copyToClipboard from "../../../utils/copyToClipboard";
import {Menu, Item } from "react-contexify";

const Menus = ({menuId, msgs}) => {
  const { handleReplyMsg } = useGetChatContext();

  return (
    <Menu id={menuId} animation={false}>
        {msgs.msg_type === "text" && (
          <Item
            onClick={() => copyToClipboard(msgs.text)}
          >
            <div className="d-flex gap-2 align-items-center">
              <div>
                <img src={copyIcon} alt="" />
              </div>
              <div>
                <span>Copy</span>
              </div>
            </div>
          </Item>
        )}
        {msgs.msg_type === "image" || msgs.msg_type === "file" ? (
          <Item>
            <div className="d-flex gap-2 align-items-center">
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
            </div>
          </Item>
        ) : (
          ""
        )}
        <Item
          onClick={() =>
            handleReplyMsg(
              msgs.msg_type === "text"
                ? {msg: msgs.text, type: 'text', msgId: msgs.msg_id}
                : msgs.msg_type === "image"
                ? {msg: msgs.image_url, type: 'image', alt: msgs.image_name, msgId: msgs.msg_id}
                : msgs.msg_type === 'file' && {msg: msgs.file_name, type: 'file', msgId: msgs.msg_id}
            )
          }
        >
          <div className="d-flex gap-2 align-items-center">
            <div>
              <VscReply />
            </div>
            <div>
              <span>Reply</span>
            </div>
          </div>
        </Item>
    </Menu>
  );
};

export default Menus;
