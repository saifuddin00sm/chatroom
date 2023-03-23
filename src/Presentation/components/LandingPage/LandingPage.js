import React from "react";
import illustration from "../../../assets/img/illustration-image.png";
import chatPreview from "../../../assets/img/chat-preview.svg";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container landing_page_main">
      <header className="landing_heading">
        <h4 className="landing_logo">Tasking.ai</h4>
        <div className="sign_in_btn row gap-2">
          <button className="col signin_btn">
            <Link to="/login">Sign In</Link>
          </button>
          <button className="col signup_btn">
            <Link to="/create-account">Sign Up</Link>
          </button>
        </div>
      </header>

      <section>
        <div className="hero_text">
          <h4 className="hero_text_heading">
            Task-oriented <br />
            Multimodal AI Assistant
          </h4>
          <p className="hero_sub_heading">
            Image, Text, File, Voice - Embrace the All-In-One Multimodal
            Revolution
          </p>
          <button className="sign_up_now" >
            <Link to="/create-account">Sign Up now</Link>
          </button>
        </div>
      </section>
      <section className="m-auto text-center preview_sect">
        <img src={illustration} alt="teen_image" />
        <img src={chatPreview} alt="chat preview" />
      </section>
    </div>
  );
};

export default LandingPage;
