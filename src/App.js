import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserState from "./contexts/UserState";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import ChatSession from "./pages/ChatSession";
import Home from "./pages/Home";
import NotificationsPage from "./pages/NotificationsPage";
import Rules from "./pages/Rules";

function App() {
  return (
    <UserState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/c/:chatId" element={<ChatSession />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/rules" element={<Rules />} />
          <Route path="/notifications" element={<NotificationsPage/>}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </UserState>
  );
}

export default App;
