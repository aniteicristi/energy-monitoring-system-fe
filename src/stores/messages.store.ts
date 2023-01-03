import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { GrpcMessagingServiceClientImpl, GrpcWebImpl } from "../proto/message";
import { grpc } from "@improbable-eng/grpc-web";
import { Subscription } from "rxjs";

export const useMessageStore = defineStore("messages", () => {
  const conversations: Record<number, Ref<Message[]>> = {};
  const rpc = new GrpcWebImpl("http://localhost:8080", {
    transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
    debug: true,
  });
  const client = new GrpcMessagingServiceClientImpl(rpc);
  let stream: Subscription | undefined;

  const init = async (user: User) => {
    stream = client.getUpdateStream({ id: user.id }).subscribe((value) => {
      console.log(value);
    });

    await client.getMessages({ id: user.id });
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
