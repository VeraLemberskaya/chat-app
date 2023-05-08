import React, { Fragment, MouseEventHandler, useState } from 'react';

import Menu from 'components/Menu';
import MenuItem from 'components/MenuItem';

import { useScrollToBottom } from 'hooks/useScrollToBottom';

import { EditIcon, TrashIcon } from 'assets/icons';

import ChatMessage from '../ChatMessage';
import { messages } from '../../mocks/data';
import { groupByDate } from '../../utils/groupByDate';

import styles from './MessageList.module.scss';

const MessageList = () => {
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
      <div className={styles.messageList} ref={ref}>
        {groupedMessages.map((group) => (
          <Fragment key={group.date}>
            <span className={styles.date}>{group.date}</span>
            {group.messages.map((message) => (
              <ChatMessage key={message.id} message={message} onContextMenu={handleContextMenu} />
            ))}
          </Fragment>
        ))}
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
