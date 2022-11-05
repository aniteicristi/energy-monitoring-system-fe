import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import { useCookies } from "vue3-cookies";
import { User } from "../models/user.model";
import * as gateway from "../gateways/auth.gateway";

export const useAuthStore = defineStore("auth", () => {
  const { cookies } = useCookies();

  const user: Ref<User | null> = ref(null);

  const isLoggedIn = computed(() => !!cookies.get("jwt"));

  const initUser = async () => {
    const resp = await gateway.self();
    if (resp.isResult()) {
      user.value = new User(resp.value);
    }
    return resp;
  };

  const login = async (email: string, password: string) => {
    const result = await gateway.login({ username: email, password });
    console.log(result);
    if (result.isResult()) {
      const { token } = result.value;
      cookies.set("jwt", token);
    }
    return result;
  };

  return {
    user,
    isLoggedIn,
    initUser,
    login,
  };
});
