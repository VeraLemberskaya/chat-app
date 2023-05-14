import { IMessage } from 'services/messages';

import {
  ADD_MESSAGE,
  AddMessageAction,
  DELETE_MESSAGE,
  DeleteMessageAction,
  SET_MESSAGES,
  SetMessagesAction,
  UPDATE_MESSAGE,
  UpdateMessageAction,
} from '../types';

export const setMessages = (payload: IMessage[]): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload,
});

export const addMessage = (payload: IMessage): AddMessageAction => ({
  type: ADD_MESSAGE,
  payload,
});

export const deleteMessage = (payload: number): DeleteMessageAction => ({
  type: DELETE_MESSAGE,
  payload,
});

export const updateMessage = (payload: IMessage): UpdateMessageAction => ({
  type: UPDATE_MESSAGE,
  payload,
});
