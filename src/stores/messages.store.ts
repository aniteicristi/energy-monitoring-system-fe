import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Message } from "../models/message.model";
import * as grpcWeb from "grpc-web";
import { User } from "../models/user.model";
import * as message from "../proto/message_pb";
import { GrpcMessagingServiceClient } from "../proto/MessageServiceClientPb";

export const useMessageStore = defineStore("messages", () => {
  const conversations: Record<number, Ref<Message[]>> = {};

  const server = new GrpcMessagingServiceClient("http://localhost:3000", null, null);

  let stream: grpcWeb.ClientReadableStream<message.TextMessage> | undefined;

  const init = async (user: User) => {
    const param = new message.Client();
    param.setId(user.id);
    stream = server.getUpdateStream(param);
    stream!.on("data", (resp) => {
      console.log(resp.getMessage());
    });
  };

  const dispose = () => {
    //TODO: delete messages. Kill connection
  };

  const getConversation = (id: number) => {
    if (!conversations[id]) {
      conversations[id] = ref<Message[]>([]);
      return conversations[id];
    }
  };

  return {
    init,
    dispose,
  };
});
