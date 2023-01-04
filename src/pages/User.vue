<script lang="ts" setup>
import { onMounted, Ref, ref, Suspense } from "vue";
import { useRouter } from "vue-router";
import { Device } from "../models/device.model";
import { useAuthStore } from "../stores/auth.store";
import { useDeviceStore } from "../stores/devices.store";
import DeviceOverview from "../components/device-overview.component.vue";
import ChatView from "../components/chat-view.component.vue";
import { wsURL } from "../common/help";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "../stores/user.store";
import { User } from "../models/user.model";
import { useMessageStore } from "../stores/messages.store";

const authStore = useAuthStore();
const userStore = useUserStore();
const admin: Ref<User | undefined> = ref(undefined);
const router = useRouter();
const self = authStore.user;

const msg = ref("");
const dialog = ref(false);
const chatOpen = ref(false);

const deviceStore = useDeviceStore();
const devices: Ref<Device[]> = ref([]);
const device: Ref<Device[]> = ref([]);
const messageStore = useMessageStore();

let socket: Socket;

onMounted(async () => {
  devices.value = await deviceStore.getDevicesForUser(self!.id);
  admin.value = await userStore.getAdmin();
  socket = io(wsURL);
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on(`notify:${self?.id}`, (message: string) => {
    msg.value = message;
    dialog.value = true;
  });
});

const logout = async () => {
  const res = authStore.logout();
  socket.disconnect();
  if (res.isResult()) {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <v-navigation-drawer permanent elevation="1">
    <h2 class="pa-3">Users</h2>
    <Suspense>
      <template #default>
        <v-list select-strategy="single-independent" active-color="primary" v-model:selected="device" rounded mandatory>
          <v-list-item v-for="device in devices" :key="device.id" :title="'Device ' + device.id" :subtitle="device.address" :value="device"></v-list-item>
        </v-list>
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </v-navigation-drawer>
  <v-app-bar elevation="1" density="compact">
    <v-app-bar-title>Welcome, {{ self?.email }}</v-app-bar-title>

    <Suspense>
      <template #default>
        <v-badge dot offset-x="15" offset-y="5" color="error" v-if="!!admin && messageStore.getNewMessage(admin!.id).value">
          <v-btn variant="text" @click="chatOpen = !chatOpen"><v-icon icon="mdi-chat-outline"></v-icon></v-btn
        ></v-badge>
        <v-btn v-else variant="text" @click="chatOpen = !chatOpen"><v-icon icon="mdi-chat-outline"></v-icon></v-btn>
      </template>
      <template #fallback
        ><v-btn variant="text" @click="chatOpen = !chatOpen"><v-icon icon="mdi-chat-outline"></v-icon></v-btn>
      </template>
    </Suspense>
    <v-btn variant="text" @click="logout()"><v-icon icon="mdi-logout"></v-icon></v-btn>
  </v-app-bar>
  <v-main>
    <v-alert type="warning" v-model="dialog" border="start" closable class="ma-2">
      {{ msg }}
    </v-alert>
    <Suspense>
      <device-overview v-if="device.length > 0" :device="device[0]"></device-overview>
    </Suspense>

    <v-navigation-drawer v-model="chatOpen" location="right" v-if="chatOpen">
      <Suspense>
        <template #default>
          <chat-view :other="admin"></chat-view>
        </template>
        <template #fallback> Loading... </template>
      </Suspense>
    </v-navigation-drawer>
  </v-main>
</template>

<style></style>
