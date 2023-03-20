import React, { useState, useEffect } from "react";
import InputBox from "./InputBox/InputBox.js";
import "./Authentication.css";
// import { baseUrl, loginUrl, registerUrl } from "../urls/urls.js";
import { useAuthContext } from "../context/authContext.js";
import socialIcon from "../assets/img/social-icon.svg";

const featuresItems = [
  {
    head: "Feature 01",
    text: "Lorem ipsum dolor sit amet consectetur. Diam nec cras cras elementum congue non. Ipsum pulvinar placerat ultrices morbi donec.",
  },
  {
    head: "Feature 02",
    text: "Lorem ipsum dolor sit amet consectetur. Diam nec cras cras elementum congue non. Ipsum pulvinar placerat ultrices morbi donec.",
  },
  {
    head: "Feature 03",
    text: "Lorem ipsum dolor sit amet consectetur. Diam nec cras cras elementum congue non. Ipsum pulvinar placerat ultrices morbi donec.",
  },
];

const Authentication = () => {
  const [mode, setMode] = useState("signup");
  const {
    handleChange,
    handleLogin,
    handleRegister,
    loading,
    formState,
    sendVerification,
    showAlert, 
    setShowAlert,
    handleResetPass,
    isVerified,
    verifyLoding
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

    if (mode === "signup" || mode === "forgotPass") {
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
    }
    if (mode === "signup") {
      handleRegister(email, confirmPassword, verification);
    } else if (mode === "signin") {
      handleLogin(email, password);
    }else{
        handleResetPass(email, confirmPassword, verification);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowAlert("");
    }, 2000);

    return ()=> {
      clearTimeout(timeOut);
    }
  }, [showAlert]);

  return (
    <div className="row">
      <div className="sideBar col-3">
        <div className="container">
          <div>
            <h2 className="sideBar-logo">LOGO HERE</h2>
            <div className="features-items">
              {featuresItems.map(({ text, head }, index) => (
                <div className="mb-5" key={index}>
                  <div className="feature-head">{head}</div>
                  <div className="feature-para">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="copyright p-4 text-white">
            <p>&#64; Copyright, XXX 2023</p>
          </div>
        </div>
      </div>
      <div className="form-box col-9">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form-main">
              <div className="form-heads text-center mb-3">
                <h2>
                  {mode === "signin"
                    ? "Welcome Back"
                    : mode === "signup"
                    ? "Create new account"
                    : "Reset Password"}
                </h2>
                <p>
                  {mode === "signin"
                    ? "Welcome back!"
                    : mode === "signup"
                    ? "Register!"
                    : ""}{" "}
                  Please enter your details
                </p>
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
              {mode === "signup" || mode === "forgotPass" ? (
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
                  <a href="/" onClick={(e)=> sendVerification(e, formState)} className="verifyBtn">
                    {verifyLoding ? <div className="loader"></div> : isVerified ? 'Sent Code' : 'Send Code'}
                  </a>
                </div>
              ) : (
                ""
              )}
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
              {mode === "signup" || mode === "forgotPass" ? (
                <div className="form-inputs mb-3">
                  <label className="mb-2" htmlFor="email">
                    {mode === "signup"
                      ? "Confirm Password*"
                      : mode === "forgotPass"
                      ? "Confirm New Password*"
                      : ""}
                  </label>
                  <InputBox
                    label="******"
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              ) : (
                ""
              )}
              {mode === "signin" && (
                <div className="forgotBtn mb-3">
                  <div className="checkbox">
                    <input type="checkbox" style={{ width: "20px" }} />
                    <label htmlFor="remember">Remember for 30 days</label>
                  </div>

                  <p
                    onClick={() => setMode("forgotPass")}
                    className="forgotPass"
                  >
                    Forgot Password
                  </p>
                </div>
              )}

              <div className="form-inputs">
                <button disabled={loading} type="submit" className="submit-btn">
                  {loading
                    ? <div className="loader"></div>
                    : mode === "signin"
                    ? "Sign In"
                    : mode === "signup"
                    ? "Register"
                    : "Reset Password"}
                </button>
              </div>

              <div className="text-center mt-3">
                <p>
                  {mode === "signin" || mode === "forgotPass"
                    ? "Don’t have an account?"
                    : "Already have an account?"}{" "}
                  <span
                    onClick={() =>
                      setMode((prev) =>
                        prev === "signin"
                          ? "signup"
                          : prev === "forgotPass"
                          ? "signup"
                          : "signin"
                      )
                    }
                    className="forgotPass"
                  >
                    {mode === "signin" || mode === "forgotPass"
                      ? "Sign Up"
                      : "Sign In"}
                  </span>
                </p>
              </div>

              {mode === "signin" || mode === "signup" ? (
                <>
                  <div className="content-divider">
                    <div className="divider"></div>
                    <div>OR</div>
                    <div className="divider"></div>
                  </div>
                  <div className="social_btn mt-3">
                    <img src={socialIcon} alt="social-icon" />
                    <span>Sign In with Google</span>
                  </div>
                </>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
