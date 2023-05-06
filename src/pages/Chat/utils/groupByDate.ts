import dayjs from 'dayjs';

import { IMessage } from '../mocks/data';

interface IMessageGroup {
  date: string;
  messages: IMessage[];
}

export const groupByDate = (messages: IMessage[]) => {
  return messages.reduce((acc: IMessageGroup[], curr) => {
    const formattedDate = dayjs(curr.date).format('DD/MM/YYYY');
    const group = acc.find(({ date }) => date === formattedDate);

    if (group) {
      const index = acc.indexOf(group);
      acc[index].messages.push(curr);
    } else {
      const group = { date: formattedDate, messages: [curr] };
      acc.push(group);
    }
    return acc;
  }, []);
};
