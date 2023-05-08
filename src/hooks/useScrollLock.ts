import { useEffect } from 'react';

export const useScrollLock = (childElement: HTMLElement | null) => {
  useEffect(() => {
    const handleWheel = (e: Event) => {
      e.preventDefault();
    };

    const offsetParent = childElement?.offsetParent as HTMLElement;

    offsetParent?.addEventListener('wheel', handleWheel);
    offsetParent?.addEventListener('touchmove', handleWheel);

    return () => {
      offsetParent?.removeEventListener('wheel', handleWheel);
      offsetParent?.removeEventListener('touchmove', handleWheel);
    };
  }, [childElement]);
};
