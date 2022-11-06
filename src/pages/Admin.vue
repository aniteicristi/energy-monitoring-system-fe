<script lang="ts" setup>
import { computed, onMounted, Ref, ref, Suspense } from "vue";
import { User } from "../models/user.model";
import { useAuthStore } from "../stores/auth.store";
import { useUserStore } from "../stores/user.store";
import UserOverview from "../components/user-overview.component.vue";
import { Device } from "../models/device.model";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const self = authStore.user;

const deleteDialog = ref(false);
const editDialog = ref(false);

onMounted(async () => {
  await userStore.getUsers();
});

const users = computed(() => userStore.users.filter((u) => u.role == "user"));

const user: Ref<User[]> = ref([]);

const logout = async () => {
  const res = authStore.logout();
  if (res.isResult()) {
    router.push({ name: "login" });
  }
};

const deleteLoading = ref(false);
const deleteUser = async () => {
  deleteLoading.value = true;
  const sel = user.value[0];
  user.value = [];
  const res = await userStore.deleteUser(sel);
  if (res.isResult()) {
    users.value.splice(users.value.indexOf(sel), 1);
  }
  deleteDialog.value = false;
  deleteLoading.value = false;
};

const editLoading = ref(false);
const editEmail = ref("");
const editUser = async () => {
  editLoading.value = true;
  const sel = user.value[0];
  await userStore.editUser(sel, { email: editEmail.value });
  editDialog.value = false;
  editLoading.value = false;
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
      <user-overview v-if="user.length > 0" :user="user[0]" @onDeleteUser="deleteDialog = true" @onEditUser="editDialog = true"></user-overview>
    </Suspense>

    <v-dialog v-model="deleteDialog" width="20%">
      <v-card>
        <v-card-text> Are you sure you want to delte user? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteDialog = false">Close</v-btn>
          <v-btn color="error" @click="deleteUser()" :loading="deleteLoading">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="40%">
      <v-card>
        <v-card-title>Edit</v-card-title>
        <v-col>
          <v-text-field
            :placeholder="user[0].email"
            class="mb-3"
            v-model="editEmail"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="editDialog = false">Close</v-btn>
          <v-btn color="error" @click="editUser()" :loading="editLoading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<style></style>
