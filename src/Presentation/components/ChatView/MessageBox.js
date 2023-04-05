import React, { useState, useEffect } from "react";
import "./MessageBox.css";
import { Lightbox } from "react-modal-image";
import Menus from "./Menus";
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
import replyIcon from "../../../assets/img/reply-icon.svg";
import Music from "./Music";

const MessageBox = ({ type, position, messageItems, formattedDate, menuOepnHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [sizeOfFile, setSizeOfFile] = useState("");

  const handleModal = (url) => {
    setIsOpen(true);
    setImgUrl(url);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  async function getFileSize(fileUrl) {
    let imageSizeInMB;
    try {
      const response = await fetch(fileUrl, { mode: "no-cors" });
      const imageSizeInBytes =
        response.body
          ?.getReader()
          ?.read()
          ?.then(({ value }) => value.length)
          .catch(() => 0) || 0;
      imageSizeInMB = imageSizeInBytes / 1048576;
      // display the image size in the frontend using DOM manipulation or a framework like React or Vue
    } catch (error) {
      console.error(error);
      // handle any errors that might occur during the API request
    }

    return imageSizeInMB;
  }

  useEffect(() => {
    if (messageItems?.msg_type === "file") {
      (async function () {
        const sizes = await getFileSize(messageItems?.file_url);
        setSizeOfFile(sizes);
      })();

    }
  }, [messageItems]);

  return (
    <>
      <div className="msg_parent">
        <p
          className="msg_time"
          style={{ textAlign: position === "left" ? "right" : "left" }}
        >
          {formattedDate()}
        </p>
        <div className={`message ${position}`}>
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              menuOepnHandler(messageItems?.msg_id);
            }}
            className={`msg_main ${type}`}
            style={{ padding: `${messageItems?.msg_type === "image" ? 0 : messageItems?.file_name?.includes(".mp3") && 0}` }}
          >
            {messageItems?.isMenuOpen && <Menus type={type} msgs={messageItems} />}
            {messageItems?.msg_type === "text" ? (
              <p className="msg_text">{messageItems?.text}</p>
            ) : messageItems?.msg_type === "image" ? (
              <div
                className="msg_img"
                onClick={() => handleModal(messageItems?.image_url)}
              >
                <img
                  src={messageItems?.image_url}
                  alt={messageItems?.image_name}
                />
              </div>
            ) : messageItems?.msg_type === "file" &&
              messageItems?.file_name.includes(".mp3") ? (
              <div>
                {/* <audio controls src={messageItems?.file_url} /> */}
                <Music file={messageItems?.file_url}/>
              </div>
            ) : (
              <a href={messageItems?.file_url} download className="msg_file">
                <img
                  src={
                    messageItems?.file_name.includes(".csv")
                      ? csvIcon
                      : messageItems?.file_name.includes(".doc")
                      ? docIcon
                      : messageItems?.file_name.includes(".docx")
                      ? docxIcon
                      : messageItems?.file_name.includes(".pdf")
                      ? pdfIcon
                      : messageItems?.file_name.includes(".ppt")
                      ? pptIcon
                      : messageItems?.file_name.includes(".pptx")
                      ? pptxIcon
                      : messageItems?.file_name.includes(".txt")
                      ? txtIcon
                      : messageItems?.file_name.includes(".xls")
                      ? xlsIcon
                      : messageItems?.file_name.includes(".xlsx")
                      ? xlsxIcon
                      : otherIcon
                  }
                  alt="doc-img"
                />
                <div className="content-3">
                  <div className="content">
                    <div className="text-and-supporting-text">
                      <div className="text inter-medium-oxford-blue-14px">
                        {messageItems?.file_name}
                      </div>
                      <div className="supporting-text inter-normal-fiord-14px">
                        {sizeOfFile + "MB"}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
        {type === "receiver_msg" &&
          messageItems.reply_to_msg_content &&
          messageItems?.reply_to_msg_content !== null && (
            <div className="reply_box">
              <div>
                <img
                  style={{ height: "24px", width: "24px" }}
                  src={replyIcon}
                  alt=""
                />
              </div>
              {messageItems?.reply_to_msg_type === "image" ? (
                <img
                  style={{ width: "48px", height: "32px", objectFit: "cover", borderRadius: "0px 4px 8px 8px" }}
                  src={messageItems?.reply_to_msg_content}
                  alt=""
                />
              ) : messageItems?.reply_to_msg_type === "file" ? (
                <div className="reply_type_text">
                  {messageItems?.reply_to_msg_content}
                </div>
              ) : (
                <div className="reply_type_text">
                  {messageItems?.reply_to_msg_content}
                </div>
              )}
            </div>
          )}
      </div>
      {isOpen && (
        <Lightbox
          large={imgUrl}
          alt=""
          onClose={handleModalClose}
          hideDownload={true}
          hideZoom={true}
        />
      )}
    </>
  );
};

export default MessageBox;
