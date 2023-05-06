import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

import { SendIcon } from 'assets/icons';

import styles from './ChatInput.module.scss';

const ChatInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const sendMessage = () => {
    console.log(inputValue);
    setInputValue('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleClick = () => {
    sendMessage();
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        placeholder="Start typing..."
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <button className={styles.sendButton} onClick={handleClick}>
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;
