import React, { FC } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import styles from './Message.module.scss';

type TMessageType = 'primary' | 'secondary';
type TAnchorPosition = 'left' | 'right';

interface IMessage {
  text: string;
  date: Date;
  type?: TMessageType;
  anchorPosition?: TAnchorPosition;
}

const MESSAGE_STYLES: { [key in TMessageType]: string } = {
  primary: styles.primary,
  secondary: styles.secondary,
};

const ANCHOR_STYLES: { [key in TAnchorPosition]: string } = {
  left: styles.anchorLeft,
  right: styles.anchorRight,
};

const Message: FC<IMessage> = ({ text, date, type = 'primary', anchorPosition = 'right' }) => {
  const messageClassNames = classNames(
    styles.messageWrapper,
    MESSAGE_STYLES[type],
    ANCHOR_STYLES[anchorPosition],
  );

  const formattedDate = dayjs(date).format('h:mm A');

  return (
    <div className={messageClassNames}>
      <span className={styles.anchor} />
      <div className={styles.message}>
        {text}
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};

export default Message;
