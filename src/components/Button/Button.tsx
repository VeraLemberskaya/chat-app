import React, { FC, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

import './Button.scss';

interface IButton {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IButton> = ({ children, className, onClick }) => {
  return (
    <button className={classNames(className, 'button')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
