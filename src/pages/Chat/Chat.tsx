import React from 'react';

import styles from './Chat.module.scss';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;
