import React from "react";
import ChatSidebar from "../components/ChatSidebar";
import NewChatButton from "../components/NewChatButton";

const Chat = () => {

  return (
    <div className="h-screen w-screen flex flex-row">
      <ChatSidebar />
      <div className="h-full w-4/5 flex flex-col justify-start gap-2 items-center relative">
        <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-center items-center p-3 ">
          Mojo-GPT
        </div>
        <div className="h-4/6 w-9/12 flex flex-col gap-4   justify-center items-center px-4 py-8">

          <NewChatButton/>
         
        </div>

      </div>
    </div>
  );
};

export default Chat;
