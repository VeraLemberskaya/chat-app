import { useEffect, useRef } from 'react';

export const useScrollToBottom = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  const scrollToBottom = () => {
    if (ref.current) {
      const node = ref.current;

      node.scrollTop = node.scrollHeight - node.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return ref;
};
