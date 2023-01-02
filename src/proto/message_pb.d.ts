import * as jspb from 'google-protobuf'



export class Response extends jspb.Message {
  getType(): Response.ResponseType;
  setType(value: Response.ResponseType): Response;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    type: Response.ResponseType,
  }

  export enum ResponseType { 
    OK = 0,
    ERR = 1,
  }
}

export class TextMessage extends jspb.Message {
  getId(): number;
  setId(value: number): TextMessage;

  getTo(): number;
  setTo(value: number): TextMessage;

  getFrom(): number;
  setFrom(value: number): TextMessage;

  getMessage(): string;
  setMessage(value: string): TextMessage;

  getSeen(): boolean;
  setSeen(value: boolean): TextMessage;

  getCreatedat(): string;
  setCreatedat(value: string): TextMessage;

  getType(): TextMessage.MessageType;
  setType(value: TextMessage.MessageType): TextMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TextMessage): TextMessage.AsObject;
  static serializeBinaryToWriter(message: TextMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextMessage;
  static deserializeBinaryFromReader(message: TextMessage, reader: jspb.BinaryReader): TextMessage;
}

export namespace TextMessage {
  export type AsObject = {
    id: number,
    to: number,
    from: number,
    message: string,
    seen: boolean,
    createdat: string,
    type: TextMessage.MessageType,
  }

  export enum MessageType { 
    CONTENT = 0,
    TYPING_START = 1,
    TYPING_END = 2,
    ACK = 3,
  }
}

export class Client extends jspb.Message {
  getId(): number;
  setId(value: number): Client;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Client.AsObject;
  static toObject(includeInstance: boolean, msg: Client): Client.AsObject;
  static serializeBinaryToWriter(message: Client, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Client;
  static deserializeBinaryFromReader(message: Client, reader: jspb.BinaryReader): Client;
}

export namespace Client {
  export type AsObject = {
    id: number,
  }
}

