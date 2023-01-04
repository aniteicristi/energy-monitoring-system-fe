import { defineStore } from "pinia";
import { ComputedRef, Ref, computed, ref } from "vue";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { GrpcMessagingServiceClientImpl, GrpcWebImpl, Response_ResponseType, TextMessage, TextMessage_MessageType } from "../proto/message";
import { grpc } from "@improbable-eng/grpc-web";
import { Subscription } from "rxjs";

export const useMessageStore = defineStore("messages", () => {
  let conversations: Record<number, Ref<TextMessage[]>> = {};
  let newMessages: Record<number, ComputedRef<boolean>> = {};
  let typing: Record<number, Ref<Boolean>> = {};

  const rpc = new GrpcWebImpl("http://localhost:8080", {
    transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
    debug: true,
  });

  const client = new GrpcMessagingServiceClientImpl(rpc);
  let stream: Subscription | null;
  let currentUser: User | null;

  const lazyInit = (id: number) => {
    if (!conversations[id]) conversations[id] = ref([]);
    if (!newMessages[id]) newMessages[id] = computed(() => conversations[id].value.filter((val) => val.seen == false && val.from != currentUser!.id).length > 0);
    if (!typing[id]) typing[id] = ref(false);
  };

  const handleMessage = (text: TextMessage) => {
    if (!currentUser) return;
    const convId = text.from === currentUser.id ? text.to : text.from;
    lazyInit(convId);

    if (text.type == TextMessage_MessageType.CONTENT) {
      conversations[convId].value.unshift(text);
    }
    if (text.type == TextMessage_MessageType.TYPING_START) {
      typing[convId].value = true;
    }
    if (text.type == TextMessage_MessageType.TYPING_END) {
      typing[convId].value = false;
    }
    if (text.type == TextMessage_MessageType.ACK) {
      console.log("acked");
      console.log(convId);
      const index = conversations[convId].value.findIndex((msg) => msg.id == text.id);
      if (index != undefined) conversations[convId].value[index].seen = true;
    }
  };

  const init = async (user: User) => {
    currentUser = user;
    stream = client.getUpdateStream({ id: user.id }).subscribe(handleMessage);

    await client.getMessages({ id: user.id });
  };

  const dispose = () => {
    stream?.unsubscribe();
    currentUser = null;
    conversations = {};
    typing = {};
    newMessages = {};
  };

  const sendContent = (message: string, to: number, from: number) => {
    return client.postMessage({
      id: -1,
      to: to,
      from: from,
      message: message,
      seen: false,
      createdAt: new Date().toISOString(),
      type: TextMessage_MessageType.CONTENT,
    });
  };

  const toggleTyping = (typing: boolean, to: number, from: number) => {
    return client.postMessage({
      id: -1,
      to: to,
      from: from,
      message: "typing",
      seen: false,
      createdAt: new Date().toISOString(),
      type: typing ? TextMessage_MessageType.TYPING_START : TextMessage_MessageType.TYPING_END,
    });
  };

  const markAsSeen = async (id: number, from: number, to: number) => {
    const res = await client.postMessage({
      id: id,
      to: to,
      from: from,
      message: "ack",
      seen: false,
      createdAt: new Date().toISOString(),
      type: TextMessage_MessageType.ACK,
    });
    if (res.type == Response_ResponseType.OK) {
      conversations[from].value.find((msg) => msg.id == id)!.seen = true;
    }
  };

  const getConversation = (id: number) => {
    lazyInit(id);
    return conversations[id];
  };

  const getTyping = (id: number) => {
    lazyInit(id);
    return typing[id];
  };

  const getNewMessage = (id: number) => {
    lazyInit(id);
    return newMessages[id];
  };

  return {
    init,
    dispose,
    getConversation,
    sendContent,
    toggleTyping,
    getTyping,
    getNewMessage,
    markAsSeen,
  };
});
