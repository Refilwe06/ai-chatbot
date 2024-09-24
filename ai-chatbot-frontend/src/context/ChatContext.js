import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatData, setChatData] = useState([]);

    return <ChatContext.Provider value={{chatData, setChatData}}>
        {children}
    </ChatContext.Provider>
}