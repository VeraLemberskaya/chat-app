import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { IGetMessagesParams, IMessage, messagesService } from 'services/messages';

import { ChatActionsContext, ChatContext } from './context';

interface IChatProvider {
  children: ReactNode;
}

const TAKE_AMOUNT = 5;

const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getMessages = useCallback(async (params: IGetMessagesParams) => {
    const { skipAmount, takeAmount } = params;
    const messageData = await messagesService.getMessages({ skipAmount, takeAmount });

    setMessages((prevMessages) => [...prevMessages, ...messageData]);
    setHasMore(messageData.length < takeAmount);
  }, []);

  useEffect(() => {
    getMessages({
      skipAmount: 0,
      takeAmount: TAKE_AMOUNT,
    });
  }, [getMessages]);

  const value = useMemo(
    () => ({
      hasMore,
      messages,
    }),
    [messages, hasMore],
  );

  const actions = useMemo(
    () => ({
      getMessages: () =>
        getMessages({
          skipAmount: messages.length,
          takeAmount: TAKE_AMOUNT,
        }),
    }),
    [getMessages, messages.length],
  );

  return (
    <ChatContext.Provider value={value}>
      <ChatActionsContext.Provider value={actions}>{children}</ChatActionsContext.Provider>
    </ChatContext.Provider>
  );
};

export default ChatProvider;
