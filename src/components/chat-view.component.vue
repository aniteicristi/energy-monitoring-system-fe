<template>
  <Suspense>
    <template #default>
      <v-container class="d-flex justify-end align-start flex-column full pa-0 px-2 pb-2">
        <v-container class="rest d-flex flex-column-reverse mb-5 pa-0 flex-nowrap">
          <v-col>
            <v-row no-gutters class="pa-0 d-flex flex-column-reverse">
              <message :text="text.message" :seen="text.seen" :self="text.from == self!.id" v-for="text in conversation" :key="text.id" :id="text.id" :from="text.from" :to="text.to"></message>
            </v-row>
          </v-col>
        </v-container>
        <div class="text-caption" v-if="typing">{{ userName }} is typing...</div>
        <v-textarea v-model="textField" variant="outlined" append-icon="mdi-send" @click:append="send()" rows="2" no-resize density="compact" hide-details @keydown.shift.enter.prevent="send()">
        </v-textarea>
      </v-container>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { User } from "../models/user.model";
import { Ref, computed } from "@vue/reactivity";
import { useMessageStore } from "../stores/messages.store";
import { useAuthStore } from "../stores/auth.store";
import Message from "./message.component.vue";
import { Response_ResponseType, TextMessage } from "../proto/message";

const props = defineProps({
  other: User,
});
const userStore = useAuthStore();

const self = userStore.user;
const messageStore = useMessageStore();

const userName = computed(() => {
  return props.other?.email.split("@")[0] ?? "User";
});

const textField = ref("");
const send = async () => {
  const resp = await messageStore.sendContent(textField.value, props.other!.id, self!.id);
  console.log(resp);
  if (resp.type == Response_ResponseType.OK) {
    textField.value = "";
    clearTimeout(timeout);
    timeout = undefined;
    messageStore.toggleTyping(false, props.other!.id, self!.id);
    console.log("stopped typing");
  }
};

const conversation: Ref<TextMessage[]> = messageStore.getConversation(props.other!.id);
const typing: Ref<Boolean> = messageStore.getTyping(props.other!.id);

let timeout: NodeJS.Timeout | undefined = undefined;

const catchTyping = () => {
  if (!timeout) {
    messageStore.toggleTyping(true, props.other!.id, self!.id);
    console.log("typing");
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    messageStore.toggleTyping(false, props.other!.id, self!.id);
    timeout = undefined;

    console.log("stopped typing");
  }, 1000);
};

const watchy = watch(textField, (_, __) => catchTyping());
</script>

<style>
.full {
  height: 100%;
}
.rest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.rest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.rest {
  height: 90%;
  overflow-y: auto;
}
.small {
  height: 100px;
}
</style>
