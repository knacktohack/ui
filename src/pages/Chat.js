import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ChatSidebar from "../components/ChatSidebar";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const [prompt, setPrompt] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendPrompt = async () => {

    setMessages((prevMessages) => [...prevMessages, prompt]);
    setPrompt("");

    const reqBody = {
      prompt: prompt,
      user_id: "12345",
      conversation_id: "1",
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/generate`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data.response]);
      scrollToBottom();
    } catch (error) {
      toast.error("Could not generate response");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row">
      <ChatSidebar />
      <div className="h-full w-4/5 flex flex-col justify-start gap-2 items-center relative">
        <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-center items-center p-3 ">
          Mojo-GPT
        </div>
        <div className="h-4/6 w-9/12 flex flex-col gap-4 justify-start text-white overflow-y-scroll px-4 py-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "bg-green-primary max-w-fit rounded-md p-2 ml-32 self-end"
                  : "border-2 border-green-primary text-green-primary max-w-fit rounded-md p-2 mr-32 self-start"
              }
            >
              {message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="w-9/12 absolute bottom-10 flex flex-row gap-4 pt-6 bg-white ">
          <textarea
            value={prompt}
            className="border-2 border-green-primary rounded-md w-10/12 h-20 resize-none p-1 px-3 overflow-visible"
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <button
            onClick={sendPrompt}
            className="w-1/12 bg-orange-primary h-10 text-white rounded-md"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
