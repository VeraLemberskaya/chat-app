import React, { ChangeEventHandler, FC, KeyboardEventHandler, useRef, useState } from 'react';

import { SendIcon } from 'assets/icons';

import Picker from '../Picker';

import styles from './ChatInput.module.scss';

interface IChatInput {
  onSendMessage: (value: string) => void;
}

const ChatInput: FC<IChatInput> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    onSendMessage(inputValue);
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

  const handleSendClick = () => {
    sendMessage();
    inputRef.current?.focus();
  };

  const handleEmojiClick = (emoji: string) => {
    const newValue = `${inputValue}${emoji}`;
    setInputValue(newValue);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        placeholder="Start typing..."
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <div className={styles.buttonsWrapper}>
        <Picker onEmojiClick={handleEmojiClick} />
        <button className={styles.sendButton} onClick={handleSendClick}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
