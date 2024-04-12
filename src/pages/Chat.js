import React from "react";
import ChatSidebar from "../components/ChatSidebar";

const Chat = () => {
  const messages = [
    // User's message
    "Hey ChatGPT, I've been reading about insider trading lately. Can you explain what it is?",
    // ChatGPT's response
    "Hi there! Insider trading is when someone buys or sells stocks based on non-public, material information about a company.",
    // User's message
    "How does insider trading affect the stock market?",
    // ChatGPT's response
    "Insider trading can lead to unfair advantages, as those with insider information may profit at the expense of others.",
    // User's message
    "Is insider trading illegal everywhere?",
    // ChatGPT's response
    "Yes, insider trading is illegal in most countries, as it undermines the integrity of the financial markets.",
    // User's message
    "What are the consequences of getting caught for insider trading?",
    // ChatGPT's response
    "The consequences for insider trading can be severe, including hefty fines, imprisonment, and permanent bans from trading.",
    // User's closing message
    "Thanks for the information, ChatGPT! I'll make sure to steer clear of insider trading.",
  ];

  return (
    <div className="h-screen w-screen flex flex-row">
      <ChatSidebar />
      <div className="h-full w-4/5 flex flex-col justify-start gap-10 items-center relative">
        <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-center items-center p-3 ">
          Mojo-GPT
        </div>
        <div className="h-4/6 w-9/12 flex flex-col gap-4 justify-start text-white overflow-y-scroll p-2">
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
        </div>
        <div className="w-9/12 absolute bottom-10 flex flex-row gap-4">
          <textarea className="border-2 border-green-primary rounded-md w-10/12 h-28 resize-none p-1 px-3 overflow-visible" />
          <button className="w-1/12 bg-orange-primary h-10 text-white rounded-md">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
