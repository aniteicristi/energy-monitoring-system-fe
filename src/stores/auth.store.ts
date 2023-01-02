import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import { useCookies } from "vue3-cookies";
import { User } from "../models/user.model";
import * as gateway from "../gateways/auth.gateway";
import { Either, Res } from "../common/either";
import { useMessageStore } from "./messages.store";

export const useAuthStore = defineStore("auth", () => {
  const { cookies } = useCookies();

  const user: Ref<User | null> = ref(null);

  const isLoggedIn = () => !!cookies.get("jwt");

  const initUser = async () => {
    const resp = await gateway.self();
    if (resp.isResult()) {
      user.value = new User(resp.value);
      const messageStore = useMessageStore();
      await messageStore.init(user.value);
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
  const logout = (): Either<any, string> => {
    cookies.remove("jwt");
    user.value = null;
    const messageStore = useMessageStore();
    messageStore.dispose();
    return Res.create("ok");
  };

  const register = async (email: string, password: string) => {
    const result = await gateway.register({ email, password });
    return result;
  };

  return {
    user,
    isLoggedIn,
    initUser,
    login,
    logout,
    register,
  };
});
