import { IMessage } from 'services/messages';

export interface ISendMessage {
  userId: number;
  text: string;
}

export interface IUpdateMessage {
  id: number;
  text: string;
}

export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export interface SetMessagesAction {
  type: typeof SET_MESSAGES;
  payload: IMessage[];
}

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: IMessage;
}

export interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  payload: number;
}

export interface UpdateMessageAction {
  type: typeof UPDATE_MESSAGE;
  payload: IMessage;
}

export type Action =
  | SetMessagesAction
  | AddMessageAction
  | DeleteMessageAction
  | UpdateMessageAction;
