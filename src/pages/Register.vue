<script setup lang="ts">
import { ref, Ref } from "vue";

const email = ref("");
const pass = ref("");
const confirm = ref("");
const loading = ref(false);

const failed: Ref<string | null> = ref(null);

async function register() {
  if (confirm.value === pass.value) {
    failed.value = "Passwords must match";
    return;
  }
}
</script>

<template>
  <div class="center-container">
    <v-card width="400px" class="pa-5" elevation="5">
      <p v-if="failed !== null" class="red">{{ failed }}</p>
      <h2 class="mb-2">Register</h2>
      <v-text-field
        placeholder="Email"
        class="mb-3"
        v-model="email"
        variant="outlined"
        prepend-inner-icon="mdi-email"
        :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
      ></v-text-field>
      <v-text-field
        class="mb-3"
        v-model="pass"
        variant="outlined"
        type="password"
        placeholder="Password"
        prepend-inner-icon="mdi-key"
        :rules="[(v) => !!v || 'Password is requrired', (v) => v === confirm || 'Passwords must match']"
      ></v-text-field>

      <v-text-field
        class="mb-3"
        v-model="confirm"
        variant="outlined"
        placeholder="Repeat Password"
        prepend-inner-icon="mdi-key"
        type="password"
        :rules="[(v) => !!v || 'Password is requrired']"
      ></v-text-field>

      <v-btn variant="flat" color="primary" width="100%" @click="register()" :loading="loading" :active="!loading">Register</v-btn>
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

.red {
  color: red;
}
</style>
