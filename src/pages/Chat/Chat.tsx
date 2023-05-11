import React from 'react';

import ChatProvider from 'providers/chat';

import styles from './Chat.module.scss';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

const Chat = () => {
  const handleSendMessage = (value: string) => {
    console.log(value);
  };

  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <MessageList />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </ChatProvider>
  );
};

export default Chat;
