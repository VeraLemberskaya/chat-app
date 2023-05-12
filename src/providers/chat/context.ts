import { createContext, useContext } from 'react';
import { IMessage } from 'services/messages';

import { ISendMessage, IUpdateMessage } from './types';

interface IChatContext {
  messages: IMessage[];
  hasMore: boolean;
}

interface IChatActionsContext {
  getMessages: () => void;
  sendMessage: (data: ISendMessage) => void;
  updateMessage: (data: IUpdateMessage) => void;
  deleteMessage: (id: number) => void;
}

export const ChatContext = createContext<IChatContext>({
  messages: [],
  hasMore: false,
});

export const ChatActionsContext = createContext<IChatActionsContext>({
  getMessages: () => undefined,
  sendMessage: () => undefined,
  updateMessage: () => undefined,
  deleteMessage: () => undefined,
});

export const useChat = () => {
  return useContext(ChatContext);
};

export const useChatActions = () => {
  return useContext(ChatActionsContext);
};
