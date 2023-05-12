import React, { FC, Fragment, useState } from 'react';
import { IMessage } from 'services/messages';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useChat, useChatActions } from 'providers/chat';

import ChatMessage from '../ChatMessage';
import { groupByDate } from '../../utils/groupByDate';
import MessageMenu from '../MessageMenu';

import styles from './MessageList.module.scss';

interface IMessageList {
  onMessageDelete: (messageId: number) => void;
  onMessageEdit: (message: IMessage) => void;
}

const MessageList: FC<IMessageList> = ({ onMessageDelete, onMessageEdit }) => {
  const { messages, hasMore } = useChat();
  const { getMessages } = useChatActions();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [contextMessage, setContextMessage] = useState<IMessage | null>(null);

  const groupedMessages = groupByDate(messages);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: IMessage,
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setContextMessage(message);
  };

  const handleMessageEdit = () => {
    if (contextMessage) {
      onMessageEdit(contextMessage);
      handleClose();
    }
  };

  const handleMessageDelete = () => {
    if (contextMessage) {
      onMessageDelete(contextMessage.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.messageListWrapper}>
      <div className={styles.messagesContainer} id="scrollable-messages">
        <InfiniteScroll
          className={styles.messageList}
          dataLength={messages.length}
          hasMore={hasMore}
          inverse={true}
          loader={<p>Loading</p>}
          next={getMessages}
          scrollableTarget="scrollable-messages"
        >
          {groupedMessages.map((group) => (
            <Fragment key={group.date}>
              <span className={styles.date}>{group.date}</span>
              {group.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onContextMenu={(e) => handleContextMenu(e, message)}
                />
              ))}
            </Fragment>
          ))}
        </InfiniteScroll>
      </div>
      <MessageMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        onDelete={handleMessageDelete}
        onEdit={handleMessageEdit}
      />
    </div>
  );
};

export default MessageList;
