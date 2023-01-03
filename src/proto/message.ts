/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";

export const protobufPackage = "messages";

export interface Response {
  type: Response_ResponseType;
}

export enum Response_ResponseType {
  OK = 0,
  ERR = 1,
  UNRECOGNIZED = -1,
}

export function response_ResponseTypeFromJSON(object: any): Response_ResponseType {
  switch (object) {
    case 0:
    case "OK":
      return Response_ResponseType.OK;
    case 1:
    case "ERR":
      return Response_ResponseType.ERR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Response_ResponseType.UNRECOGNIZED;
  }
}

export function response_ResponseTypeToJSON(object: Response_ResponseType): string {
  switch (object) {
    case Response_ResponseType.OK:
      return "OK";
    case Response_ResponseType.ERR:
      return "ERR";
    case Response_ResponseType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface TextMessage {
  id: number;
  to: number;
  from: number;
  message: string;
  seen: boolean;
  createdAt: string;
  type: TextMessage_MessageType;
}

export enum TextMessage_MessageType {
  CONTENT = 0,
  TYPING_START = 1,
  TYPING_END = 2,
  ACK = 3,
  UNRECOGNIZED = -1,
}

export function textMessage_MessageTypeFromJSON(object: any): TextMessage_MessageType {
  switch (object) {
    case 0:
    case "CONTENT":
      return TextMessage_MessageType.CONTENT;
    case 1:
    case "TYPING_START":
      return TextMessage_MessageType.TYPING_START;
    case 2:
    case "TYPING_END":
      return TextMessage_MessageType.TYPING_END;
    case 3:
    case "ACK":
      return TextMessage_MessageType.ACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TextMessage_MessageType.UNRECOGNIZED;
  }
}

export function textMessage_MessageTypeToJSON(object: TextMessage_MessageType): string {
  switch (object) {
    case TextMessage_MessageType.CONTENT:
      return "CONTENT";
    case TextMessage_MessageType.TYPING_START:
      return "TYPING_START";
    case TextMessage_MessageType.TYPING_END:
      return "TYPING_END";
    case TextMessage_MessageType.ACK:
      return "ACK";
    case TextMessage_MessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Client {
  id: number;
}

function createBaseResponse(): Response {
  return { type: 0 };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return { type: isSet(object.type) ? response_ResponseTypeFromJSON(object.type) : 0 };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = response_ResponseTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseTextMessage(): TextMessage {
  return { id: 0, to: 0, from: 0, message: "", seen: false, createdAt: "", type: 0 };
}

export const TextMessage = {
  encode(message: TextMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.to !== 0) {
      writer.uint32(16).int32(message.to);
    }
    if (message.from !== 0) {
      writer.uint32(24).int32(message.from);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.seen === true) {
      writer.uint32(56).bool(message.seen);
    }
    if (message.createdAt !== "") {
      writer.uint32(42).string(message.createdAt);
    }
    if (message.type !== 0) {
      writer.uint32(48).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTextMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.to = reader.int32();
          break;
        case 3:
          message.from = reader.int32();
          break;
        case 4:
          message.message = reader.string();
          break;
        case 7:
          message.seen = reader.bool();
          break;
        case 5:
          message.createdAt = reader.string();
          break;
        case 6:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TextMessage {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      to: isSet(object.to) ? Number(object.to) : 0,
      from: isSet(object.from) ? Number(object.from) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      seen: isSet(object.seen) ? Boolean(object.seen) : false,
      createdAt: isSet(object.createdAt) ? String(object.createdAt) : "",
      type: isSet(object.type) ? textMessage_MessageTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: TextMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.to !== undefined && (obj.to = Math.round(message.to));
    message.from !== undefined && (obj.from = Math.round(message.from));
    message.message !== undefined && (obj.message = message.message);
    message.seen !== undefined && (obj.seen = message.seen);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.type !== undefined && (obj.type = textMessage_MessageTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TextMessage>, I>>(object: I): TextMessage {
    const message = createBaseTextMessage();
    message.id = object.id ?? 0;
    message.to = object.to ?? 0;
    message.from = object.from ?? 0;
    message.message = object.message ?? "";
    message.seen = object.seen ?? false;
    message.createdAt = object.createdAt ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseClient(): Client {
  return { id: 0 };
}

export const Client = {
  encode(message: Client, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Client {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Client {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: Client): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Client>, I>>(object: I): Client {
    const message = createBaseClient();
    message.id = object.id ?? 0;
    return message;
  },
};

export interface GrpcMessagingService {
  postMessage(request: DeepPartial<TextMessage>, metadata?: grpc.Metadata): Promise<Response>;
  getMessages(request: DeepPartial<Client>, metadata?: grpc.Metadata): Promise<Response>;
  getUpdateStream(request: DeepPartial<Client>, metadata?: grpc.Metadata): Observable<TextMessage>;
}

export class GrpcMessagingServiceClientImpl implements GrpcMessagingService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.postMessage = this.postMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getUpdateStream = this.getUpdateStream.bind(this);
  }

  postMessage(request: DeepPartial<TextMessage>, metadata?: grpc.Metadata): Promise<Response> {
    return this.rpc.unary(GrpcMessagingServicepostMessageDesc, TextMessage.fromPartial(request), metadata);
  }

  getMessages(request: DeepPartial<Client>, metadata?: grpc.Metadata): Promise<Response> {
    return this.rpc.unary(GrpcMessagingServicegetMessagesDesc, Client.fromPartial(request), metadata);
  }

  getUpdateStream(request: DeepPartial<Client>, metadata?: grpc.Metadata): Observable<TextMessage> {
    return this.rpc.invoke(GrpcMessagingServicegetUpdateStreamDesc, Client.fromPartial(request), metadata);
  }
}

export const GrpcMessagingServiceDesc = { serviceName: "messages.GrpcMessagingService" };

export const GrpcMessagingServicepostMessageDesc: UnaryMethodDefinitionish = {
  methodName: "postMessage",
  service: GrpcMessagingServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TextMessage.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Response.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const GrpcMessagingServicegetMessagesDesc: UnaryMethodDefinitionish = {
  methodName: "getMessages",
  service: GrpcMessagingServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Client.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Response.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const GrpcMessagingServicegetUpdateStreamDesc: UnaryMethodDefinitionish = {
  methodName: "getUpdateStream",
  service: GrpcMessagingServiceDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return Client.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TextMessage.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes || [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Observable((observer) => {
      const upStream = (() => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          transport: this.options.streamingTransport || this.options.transport,
          metadata: maybeCombinedMetadata,
          debug: this.options.debug,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => client.close());
      });
      upStream();
    }).pipe(share());
  }
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
