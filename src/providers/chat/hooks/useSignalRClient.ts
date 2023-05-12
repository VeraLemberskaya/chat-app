import * as SignalR from '@microsoft/signalr';
import { useEffect, useMemo } from 'react';

const CONNECTION_URL = `${process.env.REACT_APP_BASE_URL}/chat`;

export const useSignalRClient = () => {
  const connection = useMemo(
    () => new SignalR.HubConnectionBuilder().withUrl(CONNECTION_URL).build(),
    [],
  );

  useEffect(() => {
    connection.start();

    return () => {
      connection.stop();
    };
  }, [connection]);

  return connection;
};
