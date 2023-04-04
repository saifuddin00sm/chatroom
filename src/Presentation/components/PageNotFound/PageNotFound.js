import React from "react";
import illustration from "../../../assets/img/not-found.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <img src={illustration} alt="" />
        <h5 style={{ color: "#099250", marginTop: "20px", fontWeight: 700 }}>
          TASKING.AI
        </h5>
        <p className="mb-0">
          The page you are looking for doesn’t exist or has been moved
        </p>
        <h4 className="mb-3" style={{ fontWeight: 700, fontSize: "50px" }}>
          Page not found
        </h4>
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              navigate("/chat");
            } else {
              navigate("/login");
            }
          }}
          style={{
            padding: "10px 15px",
            background: "#099250",
            borderRadius: "5px",
            color: "#fff",
            border: "none",
            outline: "none",
          }}
        >
          Back home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
