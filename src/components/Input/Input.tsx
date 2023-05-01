import React, { ChangeEventHandler, FC, useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from 'assets/icons';
import classNames from 'classnames';

import styles from './Input.module.scss';

type InputType = 'text' | 'number' | 'password';

interface IInput {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  maxLength?: number;
  type?: InputType;
  isError?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<IInput> = ({
  label,
  name,
  error,
  placeholder,
  value,
  maxLength,
  type = 'text',
  isError = false,
  onChange,
  onBlur,
}) => {
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

  const inputClassNames = classNames(styles.input, { [styles.error]: isError });

  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={inputClassNames}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          type={getInputType()}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {type === 'password' && passwordAdornment}
        {isError && <p className={styles.errorText}>{error}</p>}
      </div>
    </div>
  );
};

export default Input;
