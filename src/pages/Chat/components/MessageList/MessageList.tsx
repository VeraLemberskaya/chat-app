import React, { Fragment } from 'react';

import ChatMessage from '../ChatMessage';
import { messages } from '../../mocks/data';
import { groupByDate } from '../../utils/groupByDate';

import styles from './MessageList.module.scss';

const MessageList = () => {
  const groupedMessages = groupByDate(messages);

  return (
    <div className={styles.messageListWrapper}>
      <div className={styles.messageList}>
        {groupedMessages.map((group) => (
          <Fragment key={group.date}>
            <span className={styles.date}>{group.date}</span>
            {group.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
