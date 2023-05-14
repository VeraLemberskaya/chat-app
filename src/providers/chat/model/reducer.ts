import { IMessage } from 'services/messages';

import { ADD_MESSAGE, Action, DELETE_MESSAGE, SET_MESSAGES, UPDATE_MESSAGE } from '../types';

export const reducer = (state: IMessage[], action: Action): IMessage[] => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGES:
      return [...payload, ...state];
    case ADD_MESSAGE:
      return [...state, payload];
    case DELETE_MESSAGE:
      return state.filter(({ id }) => id !== payload);
    case UPDATE_MESSAGE: {
      const index = state.findIndex(({ id }) => id === payload.id);
      const newMessages = [...state];
      newMessages[index] = payload;
      return newMessages;
    }
    default:
      return state;
  }
};
