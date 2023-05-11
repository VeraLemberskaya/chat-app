import { createContext, useContext } from 'react';
import { IMessage } from 'services/messages';

interface IChatContext {
  messages: IMessage[];
  hasMore: boolean;
}

interface IChatActionsContext {
  getMessages: () => void;
}

export const ChatContext = createContext<IChatContext>({
  messages: [],
  hasMore: false,
});

export const ChatActionsContext = createContext<IChatActionsContext>({
  getMessages: () => undefined,
});

export const useChat = () => {
  return useContext(ChatContext);
};

export const useChatActions = () => {
  return useContext(ChatActionsContext);
};
