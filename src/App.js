import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import Rules from "./pages/Rules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/rules" element={<Rules />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
