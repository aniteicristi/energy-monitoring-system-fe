<template>
  <v-card class="pa-2 text-body-2 my-2 fit" width="80%" color="primary" variant="tonal" v-if="self">
    {{ props.text }}
    <v-card-subtitle class="pa-0 ma-0 heigty">
      <v-icon v-if="seen" size="x-small">mdi-check-all</v-icon>
    </v-card-subtitle>
  </v-card>
  <v-card class="pa-2 ml-auto text-body-2 my-2 fit" width="80%" variant="tonal" v-else>
    {{ props.text }}
    <v-card-subtitle class="pa-0 ma-0 heigty">
      <v-icon v-if="seen" size="x-small">mdi-check-all</v-icon>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useMessageStore } from "../stores/messages.store";

const props = defineProps({
  self: Boolean,
  text: String,
  seen: Boolean,
  to: Number,
  from: Number,
  id: Number,
});
const messageStore = useMessageStore();

onMounted(() => {
  if (!props.seen && !props.self && props.id != undefined && props.from != undefined && props.to != undefined) {
    messageStore.markAsSeen(props.id, props.from, props.to);
  }
});
</script>

<style>
.heigty {
  height: 40;
}
.fit {
  height: fit-content;
}
</style>
