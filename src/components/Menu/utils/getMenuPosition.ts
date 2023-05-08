import { IAnchorPosition } from '../types';

export const getMenuPosition = (anchorEl: HTMLElement, anchorPosition: IAnchorPosition) => {
  const { top, left, bottom, right } = anchorEl.getBoundingClientRect();
  const verticalCenter = (top + bottom) / 2;
  const horizontalCenter = (left + right) / 2;

  const verticalPosition = { top, bottom, center: verticalCenter };
  const horizontalPosition = { left, right, center: horizontalCenter };

  return {
    top: verticalPosition[anchorPosition.vertical],
    left: horizontalPosition[anchorPosition.horizontal],
  };
};
