import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ChatSidebar from "../components/ChatSidebar";
import { backendUrl } from "../constants";
import userContext from "../contexts/UserContext";

const ChatSession = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const conversation_id = currentUrl.split('/')[3];
  const {user} = useContext(userContext);

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [shouldRerenderSidebar, setShouldRerenderSidebar] = useState(false); // State to track whether to rerender sidebar

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/history/${user.user_id}/${conversation_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(response.data.response);
      } catch (error) {
        console.log("Could not generate response");
      }
    };
    fetchMessages();
  }, [conversation_id,user]);

  useEffect(() => {
    scrollToBottom();
      // Set the state to rerender sidebar
      setShouldRerenderSidebar(!shouldRerenderSidebar);
  }, [messages]);

  const sendPrompt = async () => {
    const obj = {
      content: prompt,
      type: "human",
    };
    setMessages((prevMessages) => [...prevMessages, obj]);
    setPrompt("");

    const reqBody = {
      prompt: prompt,
      user_id: user.user_id,
      conversation_id: conversation_id,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/generate`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prevMessages) => [...prevMessages, { content: response.data.response, type: "ai",flagged : response.data.status === 400 }]);
      scrollToBottom();
    } catch (error) {
      toast.error("Could not generate response");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row">
      {/* Pass the shouldRerenderSidebar state as a prop */}
      <ChatSidebar conversationId={conversation_id} shouldRerender={shouldRerenderSidebar} />
      <div className="h-full w-4/5 flex flex-col justify-start gap-2 items-center relative">
        <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-center items-center p-3 ">
          Mojo-GPT
        </div>
        <div className="h-4/6 w-9/12 flex flex-col gap-4 justify-start text-white overflow-y-scroll px-4 py-8">
          {messages.length === 0 && (
            <div className="text-neutral-600 text-2xl flex flex-col justify-center items-center">
              Start by asking something...
            </div>
          )}
          {messages.map((item, index) => (
            <div
              key={index}
              className={
                (item.flagged || item.content.split(' ').slice(-1)[0] === ":Flagged") ?
                "border-2 border-red-500 text-red-500 bg-red-200 max-w-fit  p-2 mr-32 self-start"
                :
                item.type === "human"
                  ? "bg-green-primary max-w-fit  p-2 ml-32 self-end"
                  : "border-2 border-green-primary text-green-primary max-w-fit  p-2 mr-32 self-start"
              }
            >
              {item.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="w-9/12 absolute bottom-10 flex flex-row gap-4 pt-6 bg-white ">
          <textarea
            value={prompt}
            className="border-2 border-green-primary  w-10/12 h-20 resize-none p-1 px-3 overflow-visible"
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <button
            onClick={sendPrompt}
            className="w-1/12 bg-orange-primary h-10 text-white  cursor-pointer disabled:bg-orange-200"
            disabled={prompt.trim() === ""}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
