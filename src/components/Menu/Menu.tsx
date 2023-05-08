import React, { FC, ReactNode } from 'react';

import { useOutSideClick } from 'hooks/useOutSideClick';
import { useScrollLock } from 'hooks/useScrollLock';

import styles from './Menu.module.scss';
import { IAnchorPosition } from './types';
import { getMenuPosition } from './utils/getMenuPosition';

interface IMenu {
  isOpen: boolean;
  children: ReactNode;
  anchorEl?: HTMLElement | null;
  anchorPosition?: IAnchorPosition;
  onClose: () => void;
}

const Menu: FC<IMenu> = ({
  isOpen,
  children,
  anchorEl = document.body,
  anchorPosition = {
    vertical: 'top',
    horizontal: 'left',
  },
  onClose,
}) => {
  const ref = useOutSideClick<HTMLDivElement>(onClose);
  useScrollLock(anchorEl);

  if (!isOpen) {
    return null;
  }

  const anchor = anchorEl ?? document.body;
  const position = getMenuPosition(anchor, anchorPosition);

  return (
    <div className={styles.menu} ref={ref} style={{ top: position.top, left: position.left }}>
      <ul className={styles.menuList}>{children}</ul>
    </div>
  );
};

export default Menu;
