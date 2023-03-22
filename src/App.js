import { useEffect } from "react";
import Authentication from "./Authentication/Authentication";
import { ChatList, ChatView, SIdeMenu } from "./Presentation/index";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetChatContext, GetChatContextProvider} from "./context/getChatContext";
import { GetAuthContextProvider } from "./context/authContext";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";

function App() {
  return (
    <>
      <GetAuthContextProvider>
        <GetChatContextProvider>
          <Routes>
            {/* <Route path="auth" element={<Authentication />} /> */}
            <Route path="/" exact element={<Dashboard />} />
            <Route path="login" exact element={<Login />} />
            <Route path="create-account" exact element={<Signup />} />
            <Route path="forgot-password" exact element={<ForgotPassword />} />
          </Routes>
          <ToastContainer />
        </GetChatContextProvider>
      </GetAuthContextProvider>
    </>
  );
}

const Dashboard = () => {
  const { disconnectSocket, connectSocket } = useGetChatContext();

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div style={{display: 'flex'}}>
      <SIdeMenu />
      <ChatList />
      <ChatView />
    </div>
  );
};
export default App;
