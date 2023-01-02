export interface Message {
  type: MessageType;
  to: number;
  from: number;
  message: string;
  createdAt: string;
  seen: boolean;
}

export enum MessageType {
  CONTENT = 0,
  TYPING_START = 1,
  TYPING_END = 2,
  ACK = 3,
}
