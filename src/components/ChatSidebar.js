import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../constants";
import NewChatButton from "./NewChatButton";

const ChatSidebar = ({ conversationId, shouldRerender }) => {
  const user_id = "12345";
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/history/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSessions(response.data.response.reverse());
    } catch (error) {
      console.log("Could not fetch session heads");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [shouldRerender]); // Re-fetch sessions when shouldRerender changes

  return (
    <div className="h-full w-1/5 border border-green-primary bg-green-primary flex flex-col gap-10 p-2 text-white tracking-wide">
      <div className="flex flex-col w-full gap-4 px-2">
        <div className="w-full flex flex-row justify-center items-center border-2 border-orange-primary rounded-md p-2">
          adnan.khurshid@company.com
        </div>

        <NewChatButton />
      </div>

      <div className="flex flex-col gap-2 overflow-y-scroll px-2">
        <div className="text-lg font-medium tracking-wider">
          Previous Sessions
        </div>
        {sessions.map((item, index) => (
          <Link
            key={index}
            to={`/chat/c/${item.conversation_id}`}
            className={`w-full p-2 border-2 pointer border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out truncate ${
              conversationId === item.conversation_id ? "bg-orange-primary" : ""
            } `}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
