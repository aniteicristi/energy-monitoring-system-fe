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
  </v-col>
</template>

<script lang="ts" setup>
import { Device } from "../models/device.model";

const props = defineProps({
  device: Device,
});
</script>
