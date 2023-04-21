import React, { ChangeEventHandler, FC } from 'react';

import './Input.scss';

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
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input className="input__input" name={name} type={type} />
    </div>
  );
};

export default Input;
