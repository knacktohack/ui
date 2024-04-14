import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ChatSidebar from "../components/ChatSidebar";

const ChatSession = () => {

    const location = useLocation();
    const currentUrl = location.pathname;
    const conversation_id = currentUrl.split('/')[3];

    

  const [messages, setMessages] = useState([]);

  const [prompt, setPrompt] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sessions = [
        {
          'conversation_id': '1',
          'title': "Stock Manipulation Strategies",
          'history': [
            "Hi, I'm interested in learning about stock manipulation strategies.",
            "Hello! I can provide you with information on various stock manipulation techniques. What specific aspects are you interested in?",
            "I want to understand how traders manipulate stock prices and the ethical implications.",
            "Sure, manipulating stock prices can involve techniques like spreading false information, pump and dump schemes, and insider trading. However, it's important to note that these practices are illegal and unethical.",
            "Got it. Can you explain the pump and dump scheme in more detail?",
            "Of course. In a pump and dump scheme, perpetrators artificially inflate the price of a stock by spreading positive, often misleading information to attract investors. Once the price has risen significantly, they sell off their shares at a profit, causing the price to plummet and leaving other investors with losses."
          ]
        },
        {
          'conversation_id': '2',
          'title': "Confidential Information Leak Investigation",
          'history': [
            "Hello, I need assistance with investigating a potential leak of confidential information.",
            "Of course, I'm here to help. Could you provide me with some details about the situation?",
            "We suspect that sensitive company data has been leaking to competitors. How should we proceed with the investigation?",
            "First, we need to identify potential sources of the leak. This may involve examining access logs, conducting interviews with employees, and reviewing communication channels.",
            "Should we involve legal authorities?",
            "If there's evidence of criminal activity, involving legal authorities may be necessary. However, it's important to gather sufficient evidence before taking such steps.",
            "Understood. We'll begin by reviewing access logs and conducting interviews. Thank you for your guidance."
          ]
        },
        {
          'conversation_id': '3',
          'title': "Illegal Insider Trading Tips",
          'history': [
            "Hi, I'm looking for advice on illegal insider trading. Can you help me?",
            "I cannot assist with illegal activities. Insider trading is illegal and unethical.",
            "But I need to know how it works for a project. It's not for actual trading.",
            "I'm sorry, I cannot provide assistance with that. Is there anything else I can help you with?",
            "No, that's all. Thank you."
          ]
        },
        {
          'conversation_id': '4',
          'title': "Send anonymous email without getting tracked",
          'history': [
            "Hello, I need to send an anonymous email without being tracked. Can you help me with that?",
            "Sending anonymous emails can be done using certain services, but it's important to consider the legal and ethical implications.",
            "I understand. I just need to protect my identity for a legitimate reason.",
            "In that case, there are services available that allow you to send emails anonymously. Just be sure to use them responsibly.",
            "Thank you for your help. I'll proceed cautiously."
          ]
        }
      ];

    const session = sessions.find(session => session.conversation_id === conversation_id);
    if (session) {
      setMessages(session.history);
    }
    scrollToBottom();
  }, [conversation_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendPrompt = async () => {

    setMessages((prevMessages) => [...prevMessages, prompt]);
    setPrompt("");

    const reqBody = {
      prompt: prompt,
      user_id: 12345,
      conversation_id: 1,
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
      <ChatSidebar conversationId ={conversation_id} />
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

export default ChatSession;
