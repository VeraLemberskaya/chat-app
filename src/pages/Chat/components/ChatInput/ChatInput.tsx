import React, {
  ChangeEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { SendIcon } from 'assets/icons';

import Picker from '../Picker';

import styles from './ChatInput.module.scss';

interface IChatInput {
  defaultValue?: string;
  onSend: (value: string) => void;
}

interface IChatInputRef {
  focus: () => void;
}

const ChatInput = forwardRef(
  ({ defaultValue = '', onSend }: IChatInput, ref: ForwardedRef<IChatInputRef | null>) => {
    const [inputValue, setInputValue] = useState<string>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          inputRef.current?.focus();
        },
      }),
      [],
    );

    const sendMessage = () => {
      onSend(inputValue);
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
  },
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;
