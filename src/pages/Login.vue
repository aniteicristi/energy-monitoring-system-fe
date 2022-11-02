<script lang="ts" setup>
import { ref } from "@vue/reactivity";

const email = ref("");
const pass = ref("");

async function login(): Promise<void> {}
</script>

<template>
  <div class="center-container">
    <v-card width="300px" class="pa-5">
      <h2 class="mb-2">Login</h2>
      <v-text-field v-model="email" variant="outlined" prepend-inner-icon="mdi-email"></v-text-field>
      <v-text-field v-model="pass" variant="outlined" prepend-inner-icon="mdi-key"></v-text-field>

      <v-btn variant="outlined" color="primary" width="100%">Login</v-btn>
    </v-card>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: start;
  height: 100%;
  width: 100%;
}
</style>
