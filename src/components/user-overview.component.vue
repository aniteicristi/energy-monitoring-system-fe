<template>
  <v-col class="ma-12">
    <v-row align="start" justify="center">
      <v-card elevation="1" width="100%">
        <v-card-title
          >{{ props.user!.email }}<v-chip class="ml-5" color="primary">{{ props.user?.role }}:{{ props.user?.id }}</v-chip></v-card-title
        >
        <v-card-actions>
          <v-btn color="primary" type="plain" @click="$emit('onEditUser')">EDIT</v-btn>
          <v-btn color="error" type="plain" @click="$emit('onDeleteUser')">DELETE</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row align="center" justify="start" class="mt-6">
      <h2>Devices</h2>
      <v-btn type="flat" rounded icon="mdi-plus" elevation="0" class="mx-4" @click="associateDeviceDialog = true"></v-btn>
    </v-row>
    <v-row align="center" justify="start" class="mt-6">
      <v-container v-if="!loadingDevices">
        <v-row v-if="devices.length == 0" align="center" justify="center">No devices</v-row>
        <v-col v-else>
          <v-card v-for="device in devices" :key="device.id" elevation="1" width="70%" class="my-3">
            <v-card-title> Device {{ device.id }} </v-card-title>
            <v-card-subtitle>Address: {{ device.address }}</v-card-subtitle>
            <v-card-text>{{ device.description }}</v-card-text>
            <v-card-actions>
              <v-btn type="flat" elevation="0" color="error" class="mx-4" @click="disassociateDevice(device)">DISASSOCIATE</v-btn>
              <v-spacer></v-spacer>
              <p class="text-button">Max hourly consumption: {{ device.maximumHourlyConsumption }}</p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-container>
      <v-row v-else align="center" justify="center"><v-progress-circular indeterminate color="primary"></v-progress-circular></v-row>
    </v-row>
  </v-col>
  <v-dialog v-model="associateDeviceDialog" width="30%" scrollable>
    <v-card>
      <v-card-title>Associate Device</v-card-title>
      <v-card-text style="height: 300px">
        <v-container v-if="!loadingDevices">
          <v-row v-if="orphans.length == 0" align="center" justify="center">No devices</v-row>
          <v-col v-else>
            <v-list-item v-for="device in orphans" :key="device.id" class="my-1" :title="'Device ' + device.id" :subtitle="'Address: ' + device.address">
              <template v-slot:append>
                <v-btn color="error" icon="mdi-delete" variant="text" @click="removeDevice(device)"></v-btn>
              </template>
              <template v-slot:prepend>
                <v-btn color="primary" variant="flat" @click="associateDevice(device)" class="mx-3">ADD</v-btn>
              </template>
            </v-list-item>
          </v-col>
        </v-container>
        <v-row v-else align="center" justify="center"><v-progress-circular indeterminate color="primary"></v-progress-circular></v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="createDeviceDialog = true">New</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="associateDeviceDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="createDeviceDialog" width="40%">
    <v-card>
      <v-card-title>Create Device</v-card-title>
      <v-card-text>
        <v-text-field class="mb-3" v-model="newDeviceAddress" placeholder="Address" variant="outlined" :rules="[(v) => !!v || 'Address is required']"></v-text-field>
        <v-text-field class="mb-3" placeholder="Description" v-model="newDeviceDescription" variant="outlined" :rules="[(v) => !!v || 'Description is required']"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createDeviceDialog = false">Close</v-btn>
        <v-btn color="success" @click="createDevice()">New</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, Ref, ref } from "vue";
import { Device } from "../models/device.model";
import { User } from "../models/user.model";
import { useDeviceStore } from "../stores/devices.store";
const deviceStore = useDeviceStore();
const loadingDevices = ref(true);
const devices: Ref<Device[]> = ref([]);
const orphans: Ref<Device[]> = ref([]);
const props = defineProps({
  user: User,
});

const associateDeviceDialog = ref(false);
const createDeviceDialog = ref(false);

onMounted(async () => {
  loadingDevices.value = true;
  devices.value = await deviceStore.getDevicesForUser(props.user!.id);
  orphans.value = await deviceStore.getOrphanDevices(props.user!.id);
  loadingDevices.value = false;
});

onUpdated(async () => {
  loadingDevices.value = true;
  devices.value = await deviceStore.getDevicesForUser(props.user!.id);
  orphans.value = await deviceStore.getOrphanDevices(props.user!.id);
  loadingDevices.value = false;
});

const associateDevice = async (device: Device) => {
  const res = await deviceStore.associate(device.id, props.user!.id);
  if (res.isResult()) {
    orphans.value.splice(orphans.value.indexOf(device), 1);
    devices.value.push(res.value);
  }
};
async function disassociateDevice(device: Device) {
  console.log(device.id);
  const res = await deviceStore.disassociate(device.id);
  if (res.isResult()) {
    devices.value.splice(devices.value.indexOf(device), 1);
  }
}

const newDeviceAddress = ref("");
const newDeviceDescription = ref("");
const createDevice = async () => {
  const res = await deviceStore.createDevice({
    address: newDeviceAddress.value,
    description: newDeviceDescription.value,
  });
  if (res.isResult()) {
    orphans.value.push(res.value);
    newDeviceAddress.value = "";
    newDeviceDescription.value = "";
    createDeviceDialog.value = false;
  }
};
const removeDevice = async (device: Device) => {
  const res = await deviceStore.removeDevice(device.id);
  if (res.isResult()) {
    orphans.value.splice(orphans.value.indexOf(device), 1);
  }
};
</script>
