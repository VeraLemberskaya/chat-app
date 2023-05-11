import React, { FC, MouseEventHandler } from 'react';
import { IMessage } from 'services/messages';

import Message from 'components/Message';

import { currentUserId } from '../../mocks/data';

import styles from './ChatMessage.module.scss';

interface IChatMessage {
  message: IMessage;
  onContextMenu: MouseEventHandler<HTMLDivElement>;
}

const ChatMessage: FC<IChatMessage> = ({ message, onContextMenu }) => {
  //TODO: add auth context later
  const isCurrentUserMessage = message.userId === currentUserId;

  if (!isCurrentUserMessage)
    return (
      <Message
        anchorPosition="left"
        date={message.date}
        sender={message.userName}
        text={message.text}
        type="secondary"
      />
    );

  return (
    <Message
      className={styles.userMessage}
      date={message.date}
      text={message.text}
      onContextMenu={onContextMenu}
    />
  );
};

export default ChatMessage;
