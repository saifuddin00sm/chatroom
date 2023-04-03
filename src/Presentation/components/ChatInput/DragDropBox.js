import React from "react";
import uploadIcon from "../../../assets/img/upload-01.svg";
import "./DragDropbox.css";

const DragDropBox = () => {

  return (
    <div className="frame-340">
      <div className="frame-203">
        <img
          className="icon-upload_arrow"
          src={uploadIcon}
          alt="icon-upload_arrow"
        />
        <p className="drag-drop-or-choose-file-to-upload">
          <span className="inter-medium-heavy-metal-16px">Drag & Drop or </span>
          <span className="span1">Choose File </span>
          <span className="inter-medium-heavy-metal-16px">to upload </span>
        </p>
        <p className="docx-doc-pptx">
          .docx, .doc, .pptx, .ppt, .xls, .xlsx, .txt, .pdf, csv
        </p>
      </div>
    </div>
  );
};

export default DragDropBox;
