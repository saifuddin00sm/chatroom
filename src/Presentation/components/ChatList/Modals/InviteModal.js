import React, {useRef} from "react";
import { Modal } from "react-bootstrap";
import "./ModalStyle.css";
import { IoIosPeople } from "react-icons/io";
import {MdContentCopy} from 'react-icons/md';
import copyToClipboard from "../../../../utils/copyToClipboard";

const InviteModal = ({ isOpen, setIsInviteModal }) => {
  const inputRef = useRef(null);
const copyLinkHandler = ()=> {
  copyToClipboard(inputRef.current.value);
}

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isOpen}
      onHide={() => setIsInviteModal(false)}
    >
      <Modal.Header closeButton style={{borderBottom: 0}}></Modal.Header>

      <Modal.Body>
        <div className="invite_header">
          <div>
            <div className="friends_icon">
              <IoIosPeople style={{color: 'green', height: '64px', width: '64px'}} />
            </div>
            <p>Invite your friends to taksing.ai</p>
          </div>
        </div>
        <div>
          <div className="input_container">
            <input ref={inputRef} disabled type="text" value="xxx.com/as34ods"  />
            <button onClick={copyLinkHandler}>
              <span><MdContentCopy /></span> <span>Copy Link</span>
            </button>
          </div>
          <p className="invite_bottom_txt">Ask your friends to sign up with the link and get 1000 free credits</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InviteModal;
