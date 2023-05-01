import React, { ChangeEventHandler, FC, useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from 'assets/icons';

import styles from './Input.module.scss';

type InputType = 'text' | 'number' | 'password';

interface IInput {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  maxLength?: number;
  type?: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<IInput> = ({ label, name, type = 'text' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const getInputType = () => {
    if (type === 'password') {
      return isPasswordVisible ? 'text' : type;
    }

    return type;
  };

  const passwordAdornment = (
    <div className={styles.adornment} onClick={togglePassword}>
      {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
    </div>
  );

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} name={name} type={getInputType()} />
      {type === 'password' && passwordAdornment}
    </div>
  );
};

export default Input;
