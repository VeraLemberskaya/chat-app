import React, { useRef, useState } from 'react';
import { IMessage } from 'services/messages';

import { useChatActions } from 'providers/chat';
import { useAuth } from 'providers/auth';

import styles from './Chat.module.scss';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

const Chat = () => {
  const { user } = useAuth();
  const { sendMessage, updateMessage, deleteMessage } = useChatActions();
  const [editMessage, setEditMessage] = useState<IMessage | null>(null);

  const inputRef = useRef<{ focus: () => void }>(null);

  const handleSendMessage = (value: string) => {
    if (user) {
      if (!editMessage) {
        sendMessage({ userId: user.id, text: value });
      } else {
        updateMessage({ id: editMessage.id, text: value });
        setEditMessage(null);
      }
    }
  };

  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
  };

  const handleEditMessage = (message: IMessage) => {
    setEditMessage(message);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.chatContainer}>
      <MessageList onMessageDelete={handleDeleteMessage} onMessageEdit={handleEditMessage} />
      <ChatInput
        defaultValue={editMessage?.text}
        key={editMessage?.id}
        ref={inputRef}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
