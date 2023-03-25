import React, { useState } from "react";
import gallery_icon from "../../../assets/img/gallery_icon.png";
import attach_icon from "../../../assets/img/attach_icon.png";
import send_icon from "../../../assets/img/send_icon.png";
import "./ChatInput.css";
import formatFileSize from "../../../utils/formatFileSize";
import csvIcon from "../../../assets/img/CSV.png";
import docIcon from "../../../assets/img/DOC.png";
import docxIcon from "../../../assets/img/DOCX.png";
import otherIcon from "../../../assets/img/Other.png";
import pdfIcon from "../../../assets/img/PDF.png";
import pptIcon from "../../../assets/img/PPT.png";
import pptxIcon from "../../../assets/img/PPTX.png";
import txtIcon from "../../../assets/img/TXT.png";
import xlsIcon from "../../../assets/img/XLS.png";
import xlsxIcon from "../../../assets/img/XLSX.png";
import closeIcon from "../../../assets/img/closeIcon.png";
import replyIcon from "../../../assets/img/reply-icon.svg";
import { baseUrl, uploadMsgFileUrl, uploadMsgImgUrl } from "../../../urls/urls";
import { useGetChatContext } from "../../../context/getChatContext";
import {FaRegTimesCircle} from 'react-icons/fa'

const ChatInput = () => {
  const [inputItem, setInputItem] = useState([]);
  const [textInputVal, setTextInputVal] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState([]);
  const { chatInfo, socketActions, replyMsg, handleReplyMsg } =
    useGetChatContext();

  // Upload the files to the server when user selects any file ex: (img, doc, xls) etc...
  const handleFiles = async (e) => {
    const type = e.target.name;
    const attachment = e.target.files[0];
    if (!attachment) return;
    setInputItem([...inputItem, { loading: true, file: attachment }]);

    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const { chat_id } = chatInfo;

    const formData = new FormData();

    formData.append(type, attachment);
    formData.append("user_id", userInfo.user_id);
    formData.append("chat_id", chat_id);

    try {
      let url = `${baseUrl}${
        type === "file" ? uploadMsgFileUrl : uploadMsgImgUrl
      }`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        if (data.status === "success") {
          if (type === "image") {
            setUploadSuccess([...uploadSuccess, data.image_info]);
          } else {
            setUploadSuccess([...uploadSuccess, data.file_info]);
          }

          setInputItem([...inputItem, { loading: false, file: attachment }]);
        } else {
          setInputItem([...inputItem, { error: data.error_msg }]);
        }
      } else {
        setInputItem([...inputItem, { error: data.error_msg }]);
      }
    } catch (error) {
      setInputItem([...inputItem, { error: error.message }]);
    }
  };

  const handlMsgSubmit = (e) => {
    e.preventDefault();

    if (inputItem.length === 0 && textInputVal === "") return;
    const { user_id } = JSON.parse(localStorage.getItem("user_info"));

    const fileList = inputItem.map((items, index) => {
      if (
        items.file.name.includes("png") ||
        items.file.name.includes("jpg") ||
        items.file.name.includes("jpeg")
      ) {
        return {
          msg_type: "image",
          image_id: uploadSuccess[index]?.image_id,
        };
      } else {
        return {
          msg_type: "file",
          file_id: uploadSuccess[index]?.file_id,
        };
      }
    });

    let msgList = [];

    if (fileList.length > 0) {
      if (textInputVal !== "") {
        msgList = [
          ...fileList,
          {
            msg_type: "text",
            text: textInputVal,
          },
        ];
      } else {
        msgList = fileList;
      }
    } else {
      msgList = [
        {
          msg_type: "text",
          text: textInputVal,
        },
      ];
    }

    const msgObj = {
      chat_id: chatInfo?.chat_id,
      sender_id: user_id,
      bot_id: chatInfo?.bot_id,
      frontend_utc_timestamp: Date.now(),
      msg_list: msgList,
    };

    // Socket send message handler
    socketActions(msgObj);

    // Clear the old states once submit the message to the socket.io
    setTextInputVal("");
    setInputItem([]);
    setUploadSuccess([]);
    handleReplyMsg("");
  };

  // This function creates new lines when pressed crtl+enter key
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      // Insert new line character at current cursor position
      const startPos = event.target.selectionStart;
      const endPos = event.target.selectionEnd;
      setTextInputVal(
        textInputVal.substring(0, startPos) +
          "\n" +
          textInputVal.substring(endPos, textInputVal.length)
      );

      // Move cursor to new line
      event.target.selectionStart = event.target.selectionEnd = startPos + 1;

      // Prevent default "Enter" behavior
      event.preventDefault();
      // this part send the messages with files when hit "Enter"
    } else if (event.key === "Enter") {
      handlMsgSubmit(event);
    }
  };

  return (
    <div className="chat_input_container">
      <form onSubmit={handlMsgSubmit} className="chat_input_content">
        <div className="file_container">
          {inputItem.length
            ? inputItem.map((files, index) => (
                <div key={index} className="file_main">
                  {files?.loading ? (
                    <div className="loader"></div>
                  ) : files?.error ? (
                    <p className="text-danger">{files.error}</p>
                  ) : (
                    <>
                      <img
                        className="file_icons"
                        src={
                          files.file.name.includes("jpg") ||
                          files.file.name.includes("png") ||
                          files.file.name.includes("jpeg")
                            ? uploadSuccess[index]?.image_url
                            : files.file.name.includes(".csv")
                            ? csvIcon
                            : files.file.name.includes(".doc")
                            ? docIcon
                            : files.file.name.includes(".docx")
                            ? docxIcon
                            : files.file.name.includes(".pdf")
                            ? pdfIcon
                            : files.file.name.includes(".ppt")
                            ? pptIcon
                            : files.file.name.includes(".pptx")
                            ? pptxIcon
                            : files.file.name.includes(".txt")
                            ? txtIcon
                            : files.file.name.includes(".xls")
                            ? xlsIcon
                            : files.file.name.includes(".xlsx")
                            ? xlsxIcon
                            : otherIcon
                        }
                        alt="preview-img"
                      />
                      <div>
                        <div className="file_name">{files.file.name}</div>
                        <span className="file_kb">
                          {formatFileSize(files.file.size)}
                        </span>
                      </div>
                    </>
                  )}
                  <div
                    className="closeIcon"
                    onClick={() => {
                      setInputItem(inputItem.filter((f, ind) => ind !== index));
                      setUploadSuccess(
                        uploadSuccess.filter((f, ind) => ind !== index)
                      );
                    }}
                  >
                    <img src={closeIcon} alt="closeIcon" />
                  </div>
                </div>
              ))
            : ""}
        </div>
        {replyMsg && (
          <div className="replyMsg">
            <div>
              <img src={replyIcon} alt="" />
              <span>{replyMsg}</span>
            </div>
            <div onClick={()=> handleReplyMsg('')} style={{cursor: 'pointer'}}>
              <FaRegTimesCircle style={{height: '18px', width: '18px'}} />
            </div>
          </div>
        )}
        <textarea
          value={textInputVal}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextInputVal(e.target.value)}
          placeholder="Send a message"
          rows={3}
        ></textarea>

        <div className="chat_input_btn_container">
          <div className="chat_input_btn_left">
            <div className="buttons">
              <img src={gallery_icon} alt="" className="img-fluid" />
              <input
                onChange={handleFiles}
                className="file_input"
                name="image"
                type="file"
                accept=".png, .jpg, .jpeg"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="buttons">
              <img src={attach_icon} alt="" className="img-fluid" />
              <input
                onChange={handleFiles}
                className="file_input"
                name="file"
                type="file"
                accept=".doc, .docx, .ppt, .pptx, .xls, .xlsx, .pdf, .txt, .csv"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="send_text_btn buttons">
              <img src={send_icon} alt="" className="img-fluid" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
