export interface IGetMessagesParams {
  skipAmount: number;
  takeAmount: number;
}

export interface IMessage {
  id: number;
  text: string;
  userId: string;
  userName: string;
  createdAtUTC: string;
}

export interface IGetMessagesReponse {
  skipAmount: number;
  takeAmount: number;
  messages: IMessage[];
}
