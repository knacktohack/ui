import React from "react";
import { Link } from "react-router-dom";

const ChatSidebar = (props) => {
  const conversation_id = props.conversationId;

  const chatHeads = [
    {
      conversation_id: "1",
      title: "Stock Manipulation Strategies",
    },
    {
      conversation_id: "2",
      title: "Confidential Information Leak Investigation",
    },
    {
      conversation_id: "3",
      title: "Illegal Insider Trading Tips",
    },
    {
      conversation_id: "4",
      title: "Send anonymous email without getting tracked",
    },
  ];

  return (
    <div className="h-full w-1/5 border border-green-primary bg-green-primary flex flex-col gap-10 p-4 text-white tracking-wide">
      <div className="flex flex-col w-full gap-4">
        <div className="w-full flex flex-row justify-center items-center bg-orange-primary rounded-md p-2">
          adnan.khurshid@company.com
        </div>

        <Link
          to={`/chat`}
          className={`text-center w-full p-2 border-2 pointer border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out truncate `}
        >
          + New Chat
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-lg font-medium tracking-wider">
          Previous Sessions
        </div>
        {chatHeads.map((item, index) => (
          <Link
            key={index}
            to={`/chat/c/${item.conversation_id}`}
            className={`w-full p-2 border-2 pointer border-orange-primary hover:bg-orange-primary rounded-md transition duration-150 ease-in-out truncate ${
              conversation_id === item.conversation_id
                ? "bg-orange-primary"
                : ""
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
