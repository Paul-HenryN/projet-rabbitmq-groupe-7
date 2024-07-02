import { User } from "./user";

export type Message = {
  content: string;
  sender: User;
};

export type SocketMessage = {
  message: Message;
};
