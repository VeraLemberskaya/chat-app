import React, { Fragment, MouseEventHandler, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useChat, useChatActions } from 'providers/chat';

import Menu from 'components/Menu';
import MenuItem from 'components/MenuItem';

import { useScrollToBottom } from 'hooks/useScrollToBottom';

import { EditIcon, TrashIcon } from 'assets/icons';

import ChatMessage from '../ChatMessage';
import { groupByDate } from '../../utils/groupByDate';

import styles from './MessageList.module.scss';

const MessageList = () => {
  const { messages, hasMore } = useChat();
  const { getMessages } = useChatActions();
  const ref = useScrollToBottom<HTMLDivElement>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const groupedMessages = groupByDate(messages);

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.messageListWrapper}>
      <div id="scrollable-messages" ref={ref}>
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
                <ChatMessage key={message.id} message={message} onContextMenu={handleContextMenu} />
              ))}
            </Fragment>
          ))}
        </InfiniteScroll>
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorPosition={{ vertical: 'center', horizontal: 'center' }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <MenuItem icon={<EditIcon />} onClick={handleClose}>
          Edit
        </MenuItem>
        <MenuItem icon={<TrashIcon />} onClick={handleClose}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MessageList;
