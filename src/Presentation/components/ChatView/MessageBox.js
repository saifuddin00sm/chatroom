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

const MessageBox = ({ type, position, messageItems}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [sizeOfFile, setSizeOfFile] = useState("");
  const [menusItems, setMenusItems] = useState(false);

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
      <div className={`message ${position}`}>
        <div className={`msg_main ${type}`} style={{padding: `${messageItems?.msg_type === 'image' && 0}`}}>
          {menusItems && <Menus />}
          {messageItems?.msg_type === "text" ? (
            <p onContextMenu={(e)=> {
              e.preventDefault();
              if(type==='sender_msg'){
                setMenusItems(true);
              }
            }} className="msg_text">{messageItems?.text}</p>
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
