import React, { useState, useRef } from "react";
// import gallery_icon from "../../../assets/img/gallery_icon.png";
// import attach_icon from "../../../assets/img/attach_icon.png";
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
import cleanIcon from "../../../assets/img/clean_icon.svg";
import { baseUrl, uploadMsgFileUrl, uploadMsgImgUrl } from "../../../urls/urls";
import { useGetChatContext } from "../../../context/getChatContext";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import {ImAttachment} from 'react-icons/im';
import {CiImageOn} from 'react-icons/ci';
import DragDropBox from "./DragDropBox";

const ChatInput = ({ handleCleanContext, isCleanLoading }) => {
  const [inputItem, setInputItem] = useState([]);
  const [textInputVal, setTextInputVal] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const [textAreaRows, setTextAreaRows] = useState(2);
  const { chatInfo, socketActions, replyMsg, handleReplyMsg } =
    useGetChatContext();
    const imgFileInputRef = useRef(null);
    const fileInputRef = useRef(null);

  // Upload the files to the server when user selects any file ex: (img, doc, xls) etc...
  const handleFiles = async (file) => {
    let type = null;
    let attachment = null;

    if (file.file && file.type) {
      type = file.type;
      attachment = file.file[0];
    } else {
      type = file.target.name;
      attachment = file.target.files[0];
    }

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
          reply_to_msg_id: replyMsg?.msgId || null,
          reply_to_msg_type: replyMsg?.type || null,
          reply_to_msg_content: replyMsg?.msg || null,
        };
      } else {
        return {
          msg_type: "file",
          file_id: uploadSuccess[index]?.file_id,
          reply_to_msg_id: replyMsg?.msgId || null,
          reply_to_msg_type: replyMsg?.type || null,
          reply_to_msg_content: replyMsg?.msg || null,
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
            reply_to_msg_id: replyMsg?.msgId || null,
            reply_to_msg_type: replyMsg?.type || null,
            reply_to_msg_content: replyMsg?.msg || null,
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
          reply_to_msg_id: replyMsg?.msgId || null,
          reply_to_msg_type: replyMsg?.type || null,
          reply_to_msg_content: replyMsg?.msg || null,
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
    // console.log(msgList)

    // Clear the old states once submit the message to the socket.io
    setTextInputVal("");
    setInputItem([]);
    setUploadSuccess([]);
    // setShowReplyBox(replyMsg);
    handleReplyMsg(null);
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
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDrag(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDrag(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const obj = {
      type:
        files[0].name.includes(".png") ||
        files[0].name.includes(".jpg") ||
        files[0].name.includes(".jpeg")
          ? "image"
          : "file",
      file: files,
    };
    handleFiles(obj);
    setIsDrag(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={onDropHandler}
      style={{ height: "100%", borderRadius: "6px" }}
    >
      {isDrag ? (
        <DragDropBox handleFile={handleFiles} handleKeyDown={handleKeyDown} />
      ) : (
        <div className="chat_input_container">
          <form onSubmit={handlMsgSubmit} className="chat_input_content">
            <div className="text_box">
              <textarea
                value={textInputVal}
                onKeyDown={handleKeyDown}
                onChange={(event) => {
                  setTextInputVal(event.target.value);
                  const textareaLineHeight = 30;
                  const previousRows = event.target.rows;
                  event.target.rows = 2;
                  let currentRows = Math.ceil(
                    event.target.scrollHeight / textareaLineHeight
                  );
                  event.target.rows = previousRows;
                  currentRows = Math.min(currentRows, 4);
                  if (currentRows !== textAreaRows) {
                    setTextAreaRows(currentRows);
                  } else if (
                    event.target.value.length < event.target.selectionStart
                  ) {
                    // the user is deleting text and the number of rows is decreasing
                    const newRowHeight = Math.ceil(
                      event.target.scrollHeight / textareaLineHeight
                    );
                    if (newRowHeight < textAreaRows) {
                      setTextAreaRows(newRowHeight);
                    }
                  }
                }}
                placeholder="Send a message"
                rows={textAreaRows}
              />
            </div>
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
                            <div className="file_name">
                              {files.file.name.length > 9
                                ? files.file.name.slice(0, 6).split(".")[0] +
                                  "... ." +
                                  files.file.name.split(".")[1]
                                : files.file.name}
                            </div>
                            <span className="file_kb">
                              {formatFileSize(files.file.size)}
                            </span>
                          </div>
                        </>
                      )}
                      <div
                        className="closeIcon"
                        onClick={() => {
                          if(imgFileInputRef.current.value){
                            imgFileInputRef.current.value = null;
                          }
                          if(fileInputRef.current.value){
                            fileInputRef.current.value = null;
                          }
                          setInputItem(
                            inputItem.filter((f, ind) => ind !== index)
                          );
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
                <div className="d-flex gap-2">
                  <div>
                    <img src={replyIcon} alt="" />
                  </div>
                  {replyMsg.type === "text" ? (
                    <span>
                      {replyMsg.msg.length > 50
                        ? replyMsg.msg.slice(0, 50) + "..."
                        : replyMsg.msg}
                    </span>
                  ) : replyMsg.type === "image" ? (
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src={replyMsg.msg}
                      alt={replyMsg.alt}
                    />
                  ) : (
                    replyMsg.type === "file" && <span>{replyMsg.msg}</span>
                  )}
                </div>
                <div
                  onClick={() => handleReplyMsg(null)}
                  style={{ cursor: "pointer" }}
                >
                  <FaRegTimesCircle style={{ height: "18px", width: "18px" }} />
                </div>
              </div>
            )}
            <div className="chat_input_btn_container">
              <div className="chat_input_btn_left">
                {/* Image upload input */}
                <div className="buttons">
                  {/* <img src={gallery_icon} alt="" className="img-fluid" /> */}
                  <CiImageOn style={{height: '19px', width: '19px'}}/>
                  <input
                    ref={imgFileInputRef}
                    onChange={handleFiles}
                    className="file_input"
                    name="image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="buttons">
                  {/* file upload input */}
                  {/* <img src={attach_icon} alt="" className="img-fluid" /> */}
                  <ImAttachment style={{height: '17px', width: '17px'}} color="#515151" />
                  <input
                    ref={fileInputRef}
                    onChange={handleFiles}
                    className="file_input"
                    name="file"
                    type="file"
                    accept=".doc, .docx, .ppt, .pptx, .xls, .xlsx, .pdf, .txt, .csv"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="buttons">
                  {/* <img src={attach_icon} alt="" className="img-fluid" /> */}
                  {/* voice file input */}
                  <MdOutlineKeyboardVoice
                    style={{ height: "19px", width: "19px" }}
                  />
                  <input
                    disabled
                    // onChange={handleFiles}
                    className="file_input"
                    name="file"
                    type="file"
                    // accept=".doc, .docx, .ppt, .pptx, .xls, .xlsx, .pdf, .txt, .csv"
                    // onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="clearn-context-5" onClick={handleCleanContext}>
                  <img
                    className="frame-337-1"
                    src={cleanIcon}
                    alt="Frame 337"
                  />
                  <div className="clean-context-1 inter-medium-fuscous-gray-12px">
                    {isCleanLoading ? (
                      <div className="loader"></div>
                    ) : (
                      "Clean Context"
                    )}
                  </div>
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
      )}
    </div>
  );
};

export default ChatInput;
