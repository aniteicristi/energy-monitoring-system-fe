<script lang="ts" setup>
import { onMounted, Ref, ref, Suspense } from "vue";
import { useRouter } from "vue-router";
import { Device } from "../models/device.model";
import { useAuthStore } from "../stores/auth.store";
import { useDeviceStore } from "../stores/devices.store";
import DeviceOverview from "../components/device-overview.component.vue";

const authStore = useAuthStore();
const router = useRouter();
const self = authStore.user;

const deviceStore = useDeviceStore();
const devices: Ref<Device[]> = ref([]);
const device: Ref<Device[]> = ref([]);

onMounted(async () => {
  devices.value = await deviceStore.getDevicesForUser(self!.id);
});

const logout = async () => {
  const res = authStore.logout();
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
    <v-btn variant="text" @click="logout()"><v-icon icon="mdi-logout"></v-icon></v-btn>
  </v-app-bar>
  <v-main>
    <Suspense>
      <device-overview v-if="device.length > 0" :device="device[0]"></device-overview>
    </Suspense>
  </v-main>
</template>

<style></style>
