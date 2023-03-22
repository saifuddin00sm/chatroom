import React, { useEffect } from "react";
import "./Authentication.css";
import { useAuthContext } from "../context/authContext";
import InputBox from "./InputBox/InputBox";
import socialIcon from "../assets/img/social-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    handleChange,
    handleLogin,
    loading,
    formState,
    showAlert,
    setShowAlert,
  } = useAuthContext();
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formState;

    // form validations
    if (email === "") {
      setShowAlert("Email is Required!");
      return;
    }
    if (password === "") {
      setShowAlert("Password is Required!");
      return;
    }

    handleLogin(email, password);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowAlert("");
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [showAlert]);

  return (
    <div>
      <div className="row">
        <div className="sideBar col-3">
          <div className="container">
            <div className="auth-left-main">
              <div>
                <h2 className="sideBar-logo">TASKING.AI</h2>
                <div className="features-items">
                  <h3 className="sideBar-content">Task-oriented Multimodal AI Assistant</h3>
                </div>
              </div>
              <div className="copyright text-center p-4 text-dark">
                <p>&#64; Copyright, XXX 2023</p>
              </div>
              </div>
            </div>
        </div>
        <div className="form-box col-9">
          <div className="container">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="form-main">
                <div className="form-heads text-center mb-3">
                  <h2>Welcome Back</h2>
                  <p>Welcome back! Please enter your details</p>
                </div>

                {showAlert !== "" && (
                  <div className="alert alert-danger" role="alert">
                    {showAlert}
                  </div>
                )}

                <div className="form-inputs mb-3">
                  <label className="mb-2" htmlFor="email">
                    Email*
                  </label>
                  <InputBox
                    name="email"
                    label="example@gmail.com"
                    type="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-inputs mb-2">
                  <label className="mb-2" htmlFor="email">
                    Password*
                  </label>
                  <InputBox
                    label="******"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>

                <div className="forgotBtn mb-3">
                  <div className="checkbox">
                    <input type="checkbox" style={{ width: "20px" }} />
                    <label htmlFor="remember">Remember for 30 days</label>
                  </div>

                  <Link to="forgot-password" className="forgotPass">Forgot Password</Link>
                </div>

                <div className="form-inputs">
                  <button
                    disabled={loading}
                    type="submit"
                    className="submit-btn"
                  >
                    {loading ? <div className="loader"></div> : "Sign in"}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    Don’t have an account?{" "}
                    <Link style={{ textDecoration: "none" }} to="signup">
                      <span className="forgotPass">Sign Up</span>
                    </Link>
                  </p>
                </div>

                <div className="content-divider">
                  <div className="divider"></div>
                  <div>OR</div>
                  <div className="divider"></div>
                </div>
                <div className="social_btn mt-3">
                  <img src={socialIcon} alt="social-icon" />
                  <span>Sign In with Google</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
