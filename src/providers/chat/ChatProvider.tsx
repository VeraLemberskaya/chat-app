import React, { FC, ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { IGetMessagesParams, messagesService } from 'services/messages';

import { ChatActionsContext, ChatContext } from './context';
import { ISendMessage, IUpdateMessage } from './types';
import { useSignalRClient } from './hooks/useSignalRClient';
import { reducer } from './model/reducer';
import { addMessage, deleteMessage, setMessages, updateMessage } from './model/actions';

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
  const [messages, dispatch] = useReducer(reducer, []);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const client = useSignalRClient();

  const getMessages = useCallback(async (params: IGetMessagesParams) => {
    const { skipAmount, takeAmount } = params;
    const messageData = await messagesService.getMessages({ skipAmount, takeAmount });

    dispatch(setMessages(messageData));
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
      dispatch(addMessage(data));
    });

    client.on(UPDATE_MESSAGE_HANDLER_NAME, (data) => {
      dispatch(updateMessage(data));
    });

    client.on(DELETE_MESSAGE_HANDLER_NAME, (id) => {
      dispatch(deleteMessage(id));
    });
  }, [client]);

  const handleSendMessage = useCallback(
    (data: ISendMessage) => {
      client.invoke(SEND_MESSAGE_METHOD_NAME, data);
    },
    [client],
  );

  const handleGetMessages = useCallback(() => {
    getMessages({
      skipAmount: messages.length,
      takeAmount: TAKE_AMOUNT,
    });
  }, [getMessages, messages.length]);

  const handleUpdateMessage = useCallback(
    (data: IUpdateMessage) => {
      client.invoke(UPDATE_MESSAGE_METHOD_NAME, data);
    },
    [client],
  );

  const handleDeleteMessage = useCallback(
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
      getMessages: handleGetMessages,
      sendMessage: handleSendMessage,
      updateMessage: handleUpdateMessage,
      deleteMessage: handleDeleteMessage,
    }),
    [handleSendMessage, handleUpdateMessage, handleDeleteMessage, handleGetMessages],
  );

  return (
    <ChatContext.Provider value={value}>
      <ChatActionsContext.Provider value={actions}>{children}</ChatActionsContext.Provider>
    </ChatContext.Provider>
  );
};

export default ChatProvider;
