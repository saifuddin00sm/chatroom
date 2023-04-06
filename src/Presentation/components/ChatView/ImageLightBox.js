import React from "react";
import "./MessageBox.css";
import { VscChromeClose } from "react-icons/vsc";
import { TfiDownload } from "react-icons/tfi";

const ImageLightBox = ({ url, onClose }) => {
  return (
    <div className="image_ilghtBox_container" onClick={() => onClose(false)}>
      <div class="lightBox_main">
        <div className="image_lightBox-close_icon">
          <button onClick={() => onClose(false)}>
            <VscChromeClose
              color="#FFFFFF"
              style={{ height: "24px", width: "24px" }}
            />
          </button>
        </div>
        <div style={{ maxWidth: "919px", maxHeight: "634px" }}>
          <img
            onClick={(e) => {
              e.stopPropagation();
            }}
            src={url}
            alt=""
          />
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <a
              style={{ color: "#fff", textDecoration: "none" }}
              href={url}
              download
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <div>
                  <TfiDownload
                    color="#FFFFFF"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#FFFFFF",
                  }}
                >
                  Download
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightBox;
