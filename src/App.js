import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/chat" element={<Chat/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
