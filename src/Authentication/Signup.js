import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext.js";
import InputBox from "./InputBox/InputBox.js";
import socialIcon from "../assets/img/social-icon.svg";
import "./Authentication.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    handleChange,
    handleRegister,
    loading,
    formState,
    sendVerification,
    showAlert,
    setShowAlert,
    isVerified,
    verifyLoding,
  } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, password, email, verification } = formState;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // form validations
    if (email === "") {
      setShowAlert("Email is Required!");
      return;
    }
    if (password === "") {
      setShowAlert("Password is Required!");
      return;
    }

    if (!passwordRegex.test(password)) {
      setShowAlert("Password too weak!");
      return;
    }
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setShowAlert("Passwords do not match");
        return;
      }
    } else {
      setShowAlert("Password is Required!");
      return;
    }
    if (verification === "") {
      setShowAlert("Verification code is required!");
      return;
    }

    handleRegister(email, confirmPassword, verification);
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
                <h2>Create new account</h2>
                <p>Welcome back! Register! Please enter your details</p>
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

              <div className="form-inputs mb-3">
                <label className="mb-2" htmlFor="verification">
                  Verification code*
                </label>
                <InputBox
                  label="123456"
                  name="verification"
                  type="number"
                  onChange={handleChange}
                />
                <a
                  href="/"
                  onClick={(e) => sendVerification(e, formState)}
                  className="verifyBtn"
                >
                  {verifyLoding ? (
                    <div className="loader"></div>
                  ) : isVerified ? (
                    "Sent Code"
                  ) : (
                    "Send Code"
                  )}
                </a>
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

              <div className="form-inputs mb-3">
                <label className="mb-2" htmlFor="email">
                  Confirm Password*
                </label>
                <InputBox
                  label="******"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                />
              </div>

              <div className="form-inputs">
                <button disabled={loading} type="submit" className="submit-btn">
                  {loading ? <div className="loader"></div> : "Register"}
                </button>
              </div>

              <div className="text-center mt-3">
                <p>
                  Already have an account? {' '}
                  <Link to="login" className="forgotPass">Sign In</Link>
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
  );
};

export default Signup;
