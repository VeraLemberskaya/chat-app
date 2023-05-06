import React, { FC, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import { SmileIcon } from 'assets/icons';

import styles from './Picker.module.scss';

interface IPicker {
  onEmojiClick: (emoji: string) => void;
}

const Picker: FC<IPicker> = ({ onEmojiClick }) => {
  const [isPickerOpened, setIsPickerOpened] = useState<boolean>(false);

  const handlePickerButtonClick = () => {
    setIsPickerOpened((prev) => !prev);
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData) => {
    onEmojiClick(emoji);
  };

  const handleMouseLeave = () => {
    setIsPickerOpened(false);
  };

  return (
    <div className={styles.pickerWrapper} onMouseLeave={handleMouseLeave}>
      {isPickerOpened && (
        <div className={styles.picker}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <button className={styles.pickerButton} onClick={handlePickerButtonClick}>
        <SmileIcon />
      </button>
    </div>
  );
};

export default Picker;
