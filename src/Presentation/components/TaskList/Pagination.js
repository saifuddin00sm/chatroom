import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./TaskList.css";

const Pagination = () => {
  return (
    <div className="pagination_container">
      <button className="prev-btn">
        <IoIosArrowBack />
      </button>
      <div className="item active">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
      <div className="item">...</div>
      <div className="item">10</div>
      <button className="next-btn">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
