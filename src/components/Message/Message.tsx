import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import styles from './Message.module.scss';

type TMessageType = 'primary' | 'secondary';
type TAnchorPosition = 'left' | 'right';

interface IMessage {
  text: string;
  date: Date;
  sender?: string;
  className?: string;
  type?: TMessageType;
  anchorPosition?: TAnchorPosition;
  onContextMenu?: MouseEventHandler<HTMLDivElement>;
}

const MESSAGE_STYLES: { [key in TMessageType]: string } = {
  primary: styles.primary,
  secondary: styles.secondary,
};

const ANCHOR_STYLES: { [key in TAnchorPosition]: string } = {
  left: styles.anchorLeft,
  right: styles.anchorRight,
};

const Message: FC<IMessage> = ({
  text,
  date,
  sender,
  className,
  type = 'primary',
  anchorPosition = 'right',
  onContextMenu,
}) => {
  const messageClassNames = classNames(
    className,
    styles.messageWrapper,
    MESSAGE_STYLES[type],
    ANCHOR_STYLES[anchorPosition],
  );

  const formattedDate = dayjs(date).format('h:mm A');

  return (
    <div className={messageClassNames} onContextMenu={onContextMenu}>
      <span className={styles.anchor} />
      <div className={styles.message}>
        {sender && <div className={styles.sender}>{sender}</div>}
        {text}
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};

export default Message;
