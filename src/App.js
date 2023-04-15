import { useEffect } from "react";
// import { ChatList, AppLeftView, SIdeMenu } from "./Presentation/index";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  useGetChatContext,
  GetChatContextProvider,
} from "./context/getChatContext";
import { useBotContext } from "./context/botContext";
import { GetAuthContextProvider, useAuthContext } from "./context/authContext";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";
import LandingPage from "./Presentation/components/LandingPage/LandingPage";
import PageNotFound from "./Presentation/components/PageNotFound/PageNotFound";
import { BotContextProvider } from "./context/botContext";
import { Bot, Chat } from "./Presentation";
import './App.css'

function App() {
  return (
    <>
      <GetAuthContextProvider>
        <GetChatContextProvider>
          <BotContextProvider>
            <Dashboard />
            <ToastContainer />
          </BotContextProvider>
        </GetChatContextProvider>
      </GetAuthContextProvider>
    </>
  );
}

const Dashboard = () => {
  const { disconnectSocket, connectSocket, getChatList } = useGetChatContext();
  const { getBotList } = useBotContext();
  const {token} = useAuthContext();
  useEffect(() => {
    connectSocket();
    getChatList("firstLoad");
    getBotList();

    return () => {
      disconnectSocket();
    };
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};
export default App;
