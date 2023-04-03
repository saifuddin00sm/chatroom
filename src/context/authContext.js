import { useContext, createContext, useState, useEffect } from "react";
import {
  baseUrl,
  loginUrl,
  logoutUrl,
  registerUrl,
  updatePasswordUrl,
  verificationCodeUrl,
  verifyWebTokenUrl,
} from "../urls/urls";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const GetAuthContextProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    verification: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifyLoding, setVerifyLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (email, confirmPassword, verificationCode) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", confirmPassword);
    formData.append("verification_code", verificationCode);

    try {
      setLoading(true);
      const response = await fetch(baseUrl + registerUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        if (data?.status === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_info", JSON.stringify(data.user_info));
          setToken(data.token);
          setLoading(false);
        }
      } else {
        // Login failed
        const errorData = await response.json();
        if (errorData?.status === "error") {
          setShowAlert(errorData?.error_msg);
        }
        setLoading(false);
      }
    } catch (error) {
      setShowAlert(error);
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      setLoading(true);
      const response = await fetch(baseUrl + loginUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        if (data.status === "success") {
          console.log("Logged in!", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_info", JSON.stringify(data.user_info));
          setToken(data.token);
          setLoading(false);
        }
      } else {
        // Login failed
        const errorData = await response.json();
        if (errorData?.status === "error") {
          setShowAlert(errorData?.error_msg);
        }
        setLoading(false);
      }
    } catch (error) {
      setShowAlert(error?.message);
      setLoading(false);
    }
  };

  //  verification code handler
  const sendVerification = async (e, { email }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("purpose", "register");

    try {
      setVerifyLoading(true);
      const response = await fetch(baseUrl + verificationCodeUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        if (data.status === "success") {
          setIsVerified(true);
          setVerifyLoading(false);
        }
      } else {
        // Login failed
        const errorData = await response.json();
        if (errorData?.status === "error") {
          setShowAlert(errorData?.error_msg);
          setIsVerified(false);
        }
        setVerifyLoading(false);
      }
    } catch (error) {
      setShowAlert(error?.message);
      setLoading(false);
    }
  };

  //  Reset password handler
  const handleResetPass = async (email, confirmPassword, verificationCode) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", confirmPassword);
    formData.append("verification_code", verificationCode);

    try {
      setLoading(true);
      const response = await fetch(baseUrl + updatePasswordUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        console.log("password updated", data);
        setLoading(false);
      } else {
        // Login failed
        const errorData = await response.json();
        console.log("faild reset", errorData);
        if (errorData?.status === "error") {
          setShowAlert(errorData?.error_msg);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Logs out the user with cleaning localStorage
  const handleLogout = async () => {
    const localToken = localStorage.getItem("token");
    try {
      const res = await fetch(baseUrl + logoutUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${localToken}` },
      });

      const resText = await res.json();

      if (res.ok) {
        if (resText.status === "success") {
          console.log("res", resText);
          localStorage.removeItem("token");
          setToken("");
        } else {
          console.log(resText.error_msg);
        }
      } else {
        console.log("server error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert("");
    }, 2000);
  }, [showAlert]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    async function checkToken(webToken) {
      try {
        const verifyToken = await fetch(baseUrl + verifyWebTokenUrl, {
          method: "POST",
          headers: { "Content-Length": 0, Authorization: `Bearer ${webToken}` },
        });

        const res = await verifyToken.json();
        if (res.status === "error" || !res.user_info) {
          navigate("/");
          setShowAlert(res?.error_msg);
          localStorage.removeItem("token");
        } else {
          navigate("/chat");
          console.log(res);
          localStorage.setItem("user_info", JSON.stringify(res.user_info));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (localToken) {
      const url = location.pathname;
      if (
        url !== "/chat" &&
        url !== "/login" &&
        url !== "/create-account" &&
        url !== "/forgot-password" &&
        url !== "/"
      ) {
        navigate("/page-not-found");
        return
      }
      checkToken(localToken);
      setToken(localToken);

      if (localToken === token) {
        navigate("/chat");
      } else {
        navigate("/");
      }
    } else {
      const url = location.pathname;
    if (
      url !== "/chat" &&
      url !== "/login" &&
      url !== "/create-account" &&
      url !== "/forgot-password" &&
      url !== "/"
    ) {
      navigate("/page-not-found");
      return;
    }
      navigate("/");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        formState,
        handleChange,
        handleLogin,
        handleRegister,
        sendVerification,
        loading,
        showAlert,
        setShowAlert,
        token,
        handleResetPass,
        isVerified,
        verifyLoding,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
