<template>
  <v-col class="ma-12">
    <v-row align="start" justify="start"
      ><v-card elevation="1" width="90%" class="my-3">
        <v-card-title> Device {{ props.device!.id }} </v-card-title>
        <v-card-subtitle>Address: {{ props.device!.address }}</v-card-subtitle>
        <v-card-text>{{ props.device!.description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <p class="text-button">Max hourly consumption: {{ props.device!.maximumHourlyConsumption }}</p>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row>
      <v-chip-group v-model="selDate" filter>
        <v-chip v-for="date in dates" color="primary" filter>{{ date }}</v-chip>
      </v-chip-group>
    </v-row>
    <v-row>
      <v-card elevation="1" width="50%" class="my-3">
        <v-container v-if="!loadingChart">
          <line-chart :data="deviceData" :labels="deviceLabels"></line-chart>
        </v-container>
        <v-container v-else class="d-flex justify-center align-center" style="height: 100%; width: 100%">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-container>
      </v-card>
    </v-row>
  </v-col>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, Ref, computed } from "vue";
import { Consumption } from "../models/consumption.model";
import { Device } from "../models/device.model";
import { useDeviceStore } from "../stores/devices.store";
import LineChart from "./line-chart.vue";
import moment from "moment";

const props = defineProps({
  device: Device,
});
const deviceStore = useDeviceStore();

const loadingChart = ref(true);

const deviceReadings: Ref<Consumption[]> = ref([]);

const dates = computed(() => [...new Set(deviceReadings.value.map((r) => moment(r.timestamp).format("MMMM Do YYYY")))]);

const selDate: any = ref(null);

const filteredReadings = computed(() => deviceReadings.value.filter((r) => moment(r.timestamp).format("MMMM Do YYYY") == dates.value[selDate.value]));

const deviceData = computed(() => filteredReadings.value.map((r) => r.value));
const deviceLabels = computed(() => filteredReadings.value.map((r) => moment(r.timestamp).format("HH:ss")));

onMounted(async () => {
  loadingChart.value = true;
  deviceReadings.value = await deviceStore.getDeviceReadings(props.device!.id);
  if (dates.value.length > 0) selDate.value = 0;
  loadingChart.value = false;
});

onUpdated(async () => {
  loadingChart.value = true;
  deviceReadings.value = await deviceStore.getDeviceReadings(props.device!.id);
  loadingChart.value = false;
});
</script>
