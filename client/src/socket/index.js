import { io } from 'socket.io-client';
import { socketListenEvent } from './event';

export const initSocket = ({ setSocketValue }) => {
  const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000');

  socketListenEvent(socket, { setSocketValue });
  setSocketValue((prev) => ({ ...prev, socket }));
};
