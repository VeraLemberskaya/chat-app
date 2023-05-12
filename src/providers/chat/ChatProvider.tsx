import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { IGetMessagesParams, IMessage, messagesService } from 'services/messages';

import { ChatActionsContext, ChatContext } from './context';
import { ISendMessage, IUpdateMessage } from './types';
import { useSignalRClient } from './hooks/useSignalRClient';

interface IChatProvider {
  children: ReactNode;
}

const TAKE_AMOUNT = 20;

const SEND_MESSAGE_METHOD_NAME = 'SendMessageAsync';
const DELETE_MESSAGE_METHOD_NAME = 'DeleteMessageAsync';
const UPDATE_MESSAGE_METHOD_NAME = 'UpdateMessageAsync';

const RECEIVE_MESSAGE_HANDLER_NAME = 'ReceiveMessage';
const DELETE_MESSAGE_HANDLER_NAME = 'DeleteMessage';
const UPDATE_MESSAGE_HANDLER_NAME = 'UpdateMessage';

const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const client = useSignalRClient();

  const getMessages = useCallback(async (params: IGetMessagesParams) => {
    const { skipAmount, takeAmount } = params;
    const messageData = await messagesService.getMessages({ skipAmount, takeAmount });

    setMessages((prevMessages) => [...messageData, ...prevMessages]);
    setHasMore(!(messageData.length < takeAmount));
  }, []);

  useEffect(() => {
    getMessages({
      skipAmount: 0,
      takeAmount: TAKE_AMOUNT,
    });
  }, [getMessages]);

  useEffect(() => {
    client.on(RECEIVE_MESSAGE_HANDLER_NAME, (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    client.on(UPDATE_MESSAGE_HANDLER_NAME, (data) => {
      setMessages((prevMessages) => {
        const index = prevMessages.findIndex(({ id }) => id === data.id);
        const newMessages = [...prevMessages];

        newMessages[index] = data;
        return newMessages;
      });
    });

    client.on(DELETE_MESSAGE_HANDLER_NAME, (id) => {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    });
  }, [client]);

  const sendMessage = useCallback(
    (data: ISendMessage) => {
      client.invoke(SEND_MESSAGE_METHOD_NAME, data);
    },
    [client],
  );

  const updateMessage = useCallback(
    (data: IUpdateMessage) => {
      client.invoke(UPDATE_MESSAGE_METHOD_NAME, data);
    },
    [client],
  );

  const deleteMessage = useCallback(
    (id: number) => {
      client.invoke(DELETE_MESSAGE_METHOD_NAME, id);
    },
    [client],
  );

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
      sendMessage,
      updateMessage,
      deleteMessage,
    }),
    [sendMessage, updateMessage, deleteMessage, getMessages, messages.length],
  );

  return (
    <ChatContext.Provider value={value}>
      <ChatActionsContext.Provider value={actions}>{children}</ChatActionsContext.Provider>
    </ChatContext.Provider>
  );
};

export default ChatProvider;
