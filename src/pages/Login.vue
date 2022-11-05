<script lang="ts" setup>
import { Ref, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const auth = useAuthStore();
const router = useRouter();

const tryRedirect = async () => {
  if (auth.isLoggedIn) {
    await auth.initUser();
    if (!auth.user) {
      return;
    }
    router.push({ name: auth.user!.role, params: { id: auth.user!.id } });
  }
};

const email = ref("");
const pass = ref("");
const loading = ref(false);

const failed: Ref<string | null> = ref(null);

async function login(): Promise<void> {
  loading.value = true;
  const res = await auth.login(email.value, pass.value);
  if (res.isError()) {
    failed.value = res.error.response?.status === 401 ? "Credentials are invalid." : "Something went wrong";
    pass.value = "";
    return;
  }
  await tryRedirect();
  loading.value = false;
}
async function goToRegister() {
  router.push({ name: "register" });
}
onMounted(tryRedirect);
</script>

<template>
  <v-main>
    <div class="center-container">
      <v-card width="400px" class="pa-5" elevation="5">
        <p v-if="failed !== null" class="red">{{ failed }}</p>
        <h2 class="mb-2">Login</h2>
        <v-text-field
          placeholder="Email"
          class="mb-3"
          v-model="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
        ></v-text-field>
        <v-text-field
          type="password"
          class="mb-3"
          v-model="pass"
          variant="outlined"
          placeholder="Password"
          prepend-inner-icon="mdi-key"
          :rules="[(v) => !!v || 'Password is requrired']"
        ></v-text-field>

        <v-btn class="mb-3" variant="flat" color="primary" width="100%" @click="login()" :loading="loading" :active="!loading">Login</v-btn>
        <v-btn variant="outlined" color="primary" width="100%" @click="goToRegister()">Register</v-btn>
      </v-card>
    </div>
  </v-main>
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
