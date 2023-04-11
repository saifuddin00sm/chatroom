import { useEffect } from "react";
import { ChatList, AppLeftView, SIdeMenu } from "./Presentation/index";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetChatContext, GetChatContextProvider} from "./context/getChatContext";
import { GetAuthContextProvider } from "./context/authContext";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";
import LandingPage from "./Presentation/components/LandingPage/LandingPage";
import PageNotFound from "./Presentation/components/PageNotFound/PageNotFound";
import { useState } from "react";
import { BotContextProvider } from "./context/botContext";

function App() {
  const [switchTab, setSwitchTab] = useState('people');
  return (
    <>
      <GetAuthContextProvider>
        <GetChatContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="/chat" exact element={<Dashboard switchTab={switchTab} setSwitchTab={setSwitchTab} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <ToastContainer />
        </GetChatContextProvider>
      </GetAuthContextProvider>
    </>
  );
}

const Dashboard = ({switchTab, setSwitchTab}) => {
  const { disconnectSocket, connectSocket } = useGetChatContext();

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <BotContextProvider>
      <div style={{display: 'flex'}}>
        <SIdeMenu setSwitchTab={setSwitchTab} switchTab={switchTab}/>
        <ChatList switchTab={switchTab}/>
        <AppLeftView switchTab={switchTab}/>
      </div>
    </BotContextProvider>
  );
};
export default App;
