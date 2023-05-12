import React, { FC, MouseEventHandler } from 'react';
import { IMessage } from 'services/messages';

import { useAuth } from 'providers/auth';

import Message from 'components/Message';

import styles from './ChatMessage.module.scss';

interface IChatMessage {
  message: IMessage;
  onContextMenu: MouseEventHandler<HTMLDivElement>;
}

const ChatMessage: FC<IChatMessage> = ({ message, onContextMenu }) => {
  const { user } = useAuth();
  const isCurrentUserMessage = user ? message.userId === user.id.toString() : false;

  if (!isCurrentUserMessage)
    return (
      <Message
        anchorPosition="left"
        date={message.createdAtUTC}
        sender={message.userName}
        text={message.text}
        type="secondary"
      />
    );

  return (
    <Message
      className={styles.userMessage}
      date={message.createdAtUTC}
      text={message.text}
      onContextMenu={onContextMenu}
    />
  );
};

export default ChatMessage;
