import React, { createContext, useContext, useState } from 'react';

export type Message = {
  id: string;
  destinatario: string;
  assunto: string;
  status: string;
};

type MessagesContextProps = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

const MessagesContext = createContext<MessagesContextProps | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

