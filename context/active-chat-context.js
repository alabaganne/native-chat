import { createContext, useState, useContext } from 'react';

const ActiveChatCtx = createContext();

export default ActiveChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState();
  return (
    <ActiveChatCtx.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ActiveChatCtx.Provider>
  );
};

export const useActiveChatContext = () => {
  const context = useContext(ActiveChatCtx);
  if (!context) {
    throw new Error(
      'useActiveChatContext must be used within an ActiveChatProvider'
    );
  }
  return context;
};
