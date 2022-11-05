<script lang="ts" setup>
import { computed, onMounted, Ref, ref, Suspense } from "vue";
import { User } from "../models/user.model";
import { useAuthStore } from "../stores/auth.store";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore();
const authStore = useAuthStore();
const self = authStore.user;

onMounted(async () => {
  await userStore.getUsers();
});

const users = computed(() => userStore.users);

const user: Ref<User[]> = ref([]);

const logout = async () => {
  console.log("log out");
};
</script>

<template>
  <v-navigation-drawer permanent elevation="1">
    <h2 class="pa-3">Users</h2>
    <Suspense>
      <template #default>
        <v-list select-strategy="single-independent" active-color="primary" v-model:selected="user" rounded mandatory :items="users">
          <v-list-item v-for="user in users" :key="user.id" :title="user.email" :value="user"></v-list-item>
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
      <div v-if="user.length > 0">Admin {{ user[0].email }}</div>
    </Suspense>
  </v-main>
</template>

<style></style>
