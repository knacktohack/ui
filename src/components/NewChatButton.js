import React from "react";
import { useNavigate } from "react-router-dom";

const NewChatButton = () => {

    const navigate = useNavigate();

    const generateRandomId = ()=>{

        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(2, 8);
        const randomId = `${timestamp}-${randomString}`;
    
        return randomId;
      }
    
      const onClickHandler = () => {
        const randomId = generateRandomId();
    
        
        const toPath = `/chat/c/${randomId}`;
    
        
        navigate(toPath);
      }

  return (
    <button
      onClick={onClickHandler}
      className="bg-orange-primary px-6 py-2 text-lg tracking-wide rounded-md text-white hover:bg-orange-700"
    >
      Start New Chat
    </button>
  );
};

export default NewChatButton;
