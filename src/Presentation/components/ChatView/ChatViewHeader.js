import React, { useEffect, useState} from "react";
// import pin_icon_2 from "../../../assets/img/pin_icon_2.png";
// import pin_filled_icon from "../../../assets/img/pin-filled.svg";
// import three_dots_icon from "../../../assets/img/three_dots_icon.png";
// import { IoIosArrowForward } from "react-icons/io";
import { useGetChatContext } from "../../../context/getChatContext";
import "./ChatViewHeader";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {BsPinAngle, BsPinAngleFill} from 'react-icons/bs';

const ChatViewHeader = ({ chatName, agentName, chatId, pinned }) => {
  const [inputVal, setInputVal] = useState("");
  const { updateInfo, handleDeleteChat, chatLoading } = useGetChatContext();
  const [showModal, setShowModal] = useState({ isOpen: false, chatId: "" });
  const [isFocused, setIsFocused] = useState(false);

  const handlePin = () => {
    const pins = pinned ? false : true;
    updateInfo(null, pins, chatId, "pinned");
  };

  useEffect(() => {
    setInputVal(chatName);
  }, [chatName, pinned]);


  useEffect(() => {
    const handleClick = () => {
      if(isFocused){
       if(chatName !== inputVal){
        updateInfo(null, inputVal, chatId, "name");
       }
        setIsFocused(false);
      }
    }

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    }
  }, [isFocused, inputVal]);

  return (
    <>
      <div className="chat_view_header">
        <div className="chat_view_header_left">
          <form onSubmit={(e) => updateInfo(e, inputVal, chatId, "name")}>
            <input
              onChange={(e) => setInputVal(e.target.value)}
              className="chat_header_input"
              value={inputVal}
              style={{ width: "230px" }}
              onClick={(e)=> {
                e.stopPropagation();
              }}
              onFocus={()=> setIsFocused(true)}
            />
          </form>
        </div>
        <div className="chat_view_header_right">
          <div onClick={handlePin} style={{cursor: 'pointer'}}>
            {/* <img
              src={pinned ? pin_filled_icon : pin_icon_2}
              alt="pin_icon"
              className="img-fluid w-100 h-100"
            /> */}
            {pinned ? <BsPinAngleFill color="var(--color-primary)" style={{display: 'block', height: '23px', width: '23px'}} /> : <BsPinAngle color="var(--color-primary)" style={{display: 'block', height: '23px', width: '23px'}}/>}
          </div>
          <div
            onClick={() => setShowModal({ isOpen: true, chatId: chatId })}
            style={{ cursor: "pointer" }}
          >
            <RiDeleteBin6Line
              style={{ height: "23px", width: "23px", color: "#747070", display: 'block' }}
            />
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal.isOpen}
        onHide={() => setShowModal({ ...showModal, isOpen: false })}
      >
        <Modal.Header closeButton>
          <div
            style={{
              padding: "10px",
              background: "#FEE4E2",
              borderRadius: "100%",
            }}
          >
            <RiDeleteBin6Line
              style={{ height: "23px", width: "23px", color: "#D92D20" }}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {chatLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95px",
                  width: "100%",
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {" "}
                <h4 className="modal_header_text">Delete Chat</h4>
                <p className="modal_body_text">
                  Are you sure you want to delete this chat? This action cannot
                  be undone.
                </p>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              style={{ border: "1px solid #ccc" }}
              onClick={() => setShowModal({ ...showModal, isOpen: false })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteChat(showModal.chatId);
                if (chatLoading === false) {
                  setTimeout(() => {
                    setShowModal({ ...showModal, isOpen: false });
                  }, 2000);
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatViewHeader;
