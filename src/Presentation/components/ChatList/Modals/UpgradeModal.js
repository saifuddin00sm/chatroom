import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import "./ModalStyle.css";
import { GiCheckMark } from "react-icons/gi";
import {VscChromeClose} from 'react-icons/vsc'

const UpgradeModal = ({ isOpen, setUpgradeModal }) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      show={isOpen}
      onHide={() => setUpgradeModal(false)}
    >
      <Modal.Header style={{ borderBottom: 0 }} closeButton></Modal.Header>
      <Modal.Body>
        <div className="plans_main">
          <div className="vertical_line"></div>
          <Row className="plans_container text-center">
            {/* starter */}
            <Col className="starter">
              <h2 className="header">Starter</h2>
              <p className="desc">
                Hello here is a description of the starter plan
              </p>
              <p className="sub_head">Free</p>
              <ul
                style={{ textAlign: "left" }}
                className="starter_advantages_list"
              >
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Multimodal input and output</div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Task-oriented chatting</div>
                </li>
                <li className="d-flex gap-2" style={{color: '#AEAEAE'}}>
                  <div
                    style={{
                      background: "#F2F4F7",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <VscChromeClose style={{ color: "#AEAEAE" }} />
                  </div>
                  <div>Up to 2 chats</div>
                </li>
                <li className="d-flex gap-2" style={{color: '#AEAEAE'}}>
                  <div
                    style={{
                      background: "#F2F4F7",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <VscChromeClose style={{ color: "#AEAEAE" }} />
                  </div>
                  <div>100 tasking credits</div>
                </li>
                <li className="d-flex gap-2" style={{color: '#AEAEAE'}}>
                  <div
                    style={{
                      background: "#F2F4F7",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <VscChromeClose style={{ color: "#AEAEAE" }} />
                  </div>
                  <div>Prioritize processing requests </div>
                </li>
                <li className="d-flex gap-2" style={{color: '#AEAEAE'}}>
                  <div
                    style={{
                      background: "#F2F4F7",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <VscChromeClose style={{ color: "#AEAEAE" }} />
                  </div>
                  <div>Early access to new features</div>
                </li>
              </ul>
              <button className="footer_button current_plan_btn">
                Current plan
              </button>
            </Col>
            {/* Pro plan */}
            <Col className="pro">
              <h2 className="header">Pro</h2>
              <p className="desc">
                Hello here is a description of the starter plan
              </p>
              <p className="sub_head">$19/month</p>
              <ul style={{ textAlign: "left" }} className="pro_advantages_list">
              <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Multimodal input and output</div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Task-oriented chatting</div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Up to 2 chats</div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>100 tasking credits</div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Prioritize processing requests </div>
                </li>
                <li className="d-flex gap-2">
                  <div
                    style={{
                      background: "#D1FADF",
                      borderRadius: "100%",
                      height: "25px",
                      width: "25px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <GiCheckMark style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>Early access to new features</div>
                </li>
              </ul>
              <button className="footer_button">Upgrade Now</button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpgradeModal;
