export interface IMessage {
  id: number;
  userId: number;
  username: string;
  text: string;
  date: Date;
}

export const messages = [
  {
    id: 8,
    userId: 1,
    username: 'Vera',
    text: 'Hi team 2 👋',
    date: new Date('2023-05-05T14:48:00'),
  },
  {
    id: 5,
    userId: 3,
    username: 'Aubrey',
    text: 'I was thinking the cafe downtown',
    date: new Date('2023-05-05T14:58:00'),
  },
  {
    id: 6,
    userId: 3,
    username: 'Aubrey',
    text: 'But limited vegan options ',
    date: new Date('2023-05-05T14:52:00'),
  },
  {
    id: 1,
    userId: 1,
    username: 'Vera',
    text: 'Hi team 👋',
    date: new Date('2023-05-06T14:48:00'),
  },
  {
    id: 2,
    userId: 1,
    username: 'Vera',
    text: 'Anyone on for lunch today',
    date: new Date('2023-05-06T14:48:00'),
  },
  {
    id: 3,
    userId: 2,
    username: 'Jav',
    text: 'Im down! Any ideas??',
    date: new Date('2023-05-06T14:52:00'),
  },
  {
    id: 4,
    userId: 1,
    username: 'Vera',
    text: 'I am down for whatever!',
    date: new Date('2023-05-06T14:53:00'),
  },
  {
    id: 5,
    userId: 3,
    username: 'Aubrey',
    text: 'I was thinking the cafe downtown',
    date: new Date('2023-05-06T14:58:00'),
  },
  {
    id: 6,
    userId: 3,
    username: 'Aubrey',
    text: 'But limited vegan options ',
    date: new Date('2023-05-06T14:52:00'),
  },
  {
    id: 7,
    userId: 4,
    username: 'Janet',
    text: 'That works- I was actually planning to get a smoothie anyways 👍',
    date: new Date('2023-05-06T14:52:00'),
  },
  {
    id: 8,
    userId: 1,
    username: 'Vera',
    text: 'Hi team 2 👋',
    date: new Date('2023-05-05T14:48:00'),
  },
  {
    id: 5,
    userId: 3,
    username: 'Aubrey',
    text: 'I was thinking the cafe downtown',
    date: new Date('2023-05-05T14:58:00'),
  },
  {
    id: 6,
    userId: 3,
    username: 'Aubrey',
    text: 'But limited vegan options ',
    date: new Date('2023-05-05T14:52:00'),
  },
  {
    id: 1,
    userId: 1,
    username: 'Vera',
    text: 'Hi team 👋',
    date: new Date('2023-05-06T14:48:00'),
  },
  {
    id: 2,
    userId: 1,
    username: 'Vera',
    text: 'Anyone on for lunch today',
    date: new Date('2023-05-06T14:48:00'),
  },
  {
    id: 3,
    userId: 2,
    username: 'Jav',
    text: 'Im down! Any ideas??',
    date: new Date('2023-05-07T14:52:00'),
  },
  {
    id: 4,
    userId: 1,
    username: 'Vera',
    text: 'I am down for whatever!',
    date: new Date('2023-05-07T14:53:00'),
  },
  {
    id: 5,
    userId: 3,
    username: 'Aubrey',
    text: 'I was thinking the cafe downtown',
    date: new Date('2023-05-07T14:58:00'),
  },
];

export const currentUserId = '1';
