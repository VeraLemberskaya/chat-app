import React, { FC } from 'react';

import Menu from 'components/Menu';
import MenuItem from 'components/MenuItem';

import { EditIcon, TrashIcon } from 'assets/icons';

interface IMessageMenu {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const MessageMenu: FC<IMessageMenu> = ({ anchorEl, onClose, onDelete, onEdit }) => {
  const isOpen = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorPosition={{ vertical: 'center', horizontal: 'center' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <MenuItem icon={<EditIcon />} onClick={onEdit}>
        Edit
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={onDelete}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default MessageMenu;
