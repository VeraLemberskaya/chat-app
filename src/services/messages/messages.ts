import { API } from 'services';

import { IGetMessagesParams, IGetMessagesReponse } from './types';

const MESSAGES_URL = 'Messages';

export const getMessages = async (params: IGetMessagesParams) => {
  const response = await API.get<IGetMessagesReponse>(MESSAGES_URL, params);

  return response.messages;
};
